# Security Specification for Ibb road initiatives database

This document describes the security invariants, adversarial test payloads (the "Dirty Dozen"), and the test definitions to secure the `/cooperative_initiatives/{initiativeId}` Firestore collection against unauthorized access and tampering.

## 1. Data Invariants

1. **Authentication Rule**: Any modification (create, update, delete) must be performed by a fully verified authenticated administrator.
2. **Bootstrapped Admin**: The user with verified email `eesaalqadri25@gmail.com` acts as the primary administrator.
3. **Identity Integrity**: For creating an initiative, the `ownerId` in the payload must strictly match the authenticated user's UID (`request.auth.uid`), or they must be the administrator.
4. **Strict Schema Constraints**:
   - `initiativeNumber`: String of size <= 16 matching standard formats.
   - `name`: String of size >= 5 and <= 256.
   - `sector`: Must be "الطرق".
   - `cost`: Numeric value >= 0.
   - `completionRate`: Integer between 0 and 100.
   - `status`: Must be one of `"pending"`, `"ongoing"`, `"stagnant"`, `"completed"`, `"stopped"`.
5. **PII Protection**: Since initiative documents contain sensitive community phone numbers inside the `committee` sub-array, blanket unauthenticated reads are blocked. Only authenticated verified users (or specifically admins and owners) can read the documents.
6. **Immutable Fields**: `createdAt` and `ownerId` cannot be changed after creation.
7. **Temporal Integrity**: `createdAt` on creation and `updatedAt` on update must be validated against `request.time`.

---

## 2. The "Dirty Dozen" Adversarial Payloads

Below are the 12 payloads designed to attempt to breach security or corrupt data, all of which must be blocked with `PERMISSION_DENIED`:

### Payload 1: Unauthenticated Create
- **Objective**: Create an initiative without signing in.
- **Payload**:
  ```json
  {
    "id": "unauth-init-1",
    "name": "Malicious Bypass",
    "status": "ongoing"
  }
  ```
- **Expected Outcome**: `PERMISSION_DENIED` (not signed in).

### Payload 2: Email Spoofing (Unverified Email)
- **Objective**: Bypass admin check by providing the admin email but with `email_verified` as `false`.
- **Auth Context**: `uid: "attacker-123"`, `email: "eesaalqadri25@gmail.com"`, `email_verified: false`
- **Expected Outcome**: `PERMISSION_DENIED`.

### Payload 3: Identity Spoofing (Setting Owner to Someone Else)
- **Objective**: Attacker tries to set the `ownerId` field to another user's UID.
- **Auth Context**: `uid: "attacker-123"`, `email: "attacker@gmail.com"`, `email_verified: true`
- **Payload**:
  ```json
  {
    "id": "spoofed-owner-1",
    "name": "Spoofed Owner Initiative",
    "ownerId": "victim-456",
    "status": "ongoing"
  }
  ```
- **Expected Outcome**: `PERMISSION_DENIED` (`ownerId` mismatch).

### Payload 4: Invalid Sector Injection
- **Objective**: Inject a non-approved developmental sector into the roads initiative database.
- **Payload**:
  ```json
  {
    "id": "invalid-sector-1",
    "name": "Paving Initiative",
    "sector": "Sewerage & Water",
    "ownerId": "attacker-123",
    "status": "ongoing"
  }
  ```
- **Expected Outcome**: `PERMISSION_DENIED` (Sector validation fail).

### Payload 5: Out of Bound Completion Rate
- **Objective**: Setting completion rate above 100% or negative.
- **Payload**:
  ```json
  {
    "id": "oob-progress-1",
    "name": "Infinite Progress Road",
    "completionRate": 150,
    "ownerId": "attacker-123",
    "status": "ongoing"
  }
  ```
- **Expected Outcome**: `PERMISSION_DENIED`.

### Payload 6: Corrupted Status Field
- **Objective**: Injecting an invalid state into the status field.
- **Payload**:
  ```json
  {
    "id": "invalid-status-1",
    "name": "Road in Limbo",
    "status": "destroyed_by_aliens",
    "ownerId": "attacker-123"
  }
  ```
- **Expected Outcome**: `PERMISSION_DENIED`.

### Payload 7: Shadow Update / Ghost Field Injection
- **Objective**: Bypass schema constraints by appending a hidden field (e.g., `isVerifiedAdmin: true`) during update.
- **Payload Update**:
  ```json
  {
    "id": "existing-id-1",
    "name": "Existing Road Paving",
    "isVerifiedAdmin": true
  }
  ```
- **Expected Outcome**: `PERMISSION_DENIED` (Ghost key rejected by `hasOnly`).

### Payload 8: Immutable Field Tampering (createdAt Modification)
- **Objective**: Overwriting `createdAt` with a historical date.
- **Payload Update**:
  ```json
  {
    "id": "existing-id-1",
    "createdAt": "2010-01-01T00:00:00Z"
  }
  ```
- **Expected Outcome**: `PERMISSION_DENIED` (immutability check fail).

### Payload 9: Denial of Wallet Resource Poisoning
- **Objective**: Inject an extremely long string (e.g., 2MB) into a description or ID field.
- **Payload**:
  ```json
  {
    "id": "poison-id-with-huge-string...",
    "name": "A",
    "ownerId": "attacker-123",
    "status": "ongoing"
  }
  ```
- **Expected Outcome**: `PERMISSION_DENIED` (`isValidId` or size checks fail).

### Payload 10: Unauthorized PII Data Scraping
- **Objective**: Read another user's initiatives containing private phone numbers without permission.
- **Auth Context**: Unauthenticated or normal visitor.
- **Operation**: `get` or `list` on a document not owned by the requester.
- **Expected Outcome**: `PERMISSION_DENIED`.

### Payload 11: Non-Atomic Sibling/Parent State Modification
- **Objective**: Update status or cost of an initiative without submitting proper tracking logs in the same transaction.
- **Expected Outcome**: `PERMISSION_DENIED`.

### Payload 12: Client-side Spoofed Timestamp
- **Objective**: Send client-side timestamp instead of server timestamp.
- **Payload**:
  ```json
  {
    "id": "timestamp-spoof-1",
    "name": "Road Initiative",
    "updatedAt": "2030-12-31T23:59:59.000Z",
    "ownerId": "attacker-123",
    "status": "ongoing"
  }
  ```
- **Expected Outcome**: `PERMISSION_DENIED` (requires `request.time`).

---

## 3. Test Definitions (firestore.rules.test.ts)

```typescript
import { assertFails, assertSucceeds, initializeTestEnvironment } from '@firebase/rules-unit-testing';

describe('Firestore Security Rules', () => {
  let testEnv: any;

  before(async () => {
    testEnv = await initializeTestEnvironment({
      projectId: 'resounding-listener-zrr5c',
      firestore: {
        rules: require('fs').readFileSync('firestore.rules', 'utf8'),
      },
    });
  });

  after(async () => {
    await testEnv.cleanup();
  });

  it('Payload 1: should reject unauthenticated creation', async () => {
    const unauthDb = testEnv.unauthenticatedContext().firestore();
    await assertFails(
      unauthDb.collection('cooperative_initiatives').doc('init-1').set({
        id: 'init-1',
        name: 'Malicious Bypass',
        status: 'ongoing'
      })
    );
  });

  it('Payload 2: should reject spoofed admin email without verification', async () => {
    const spoofedDb = testEnv.authenticatedContext('attacker', {
      email: 'eesaalqadri25@gmail.com',
      email_verified: false
    }).firestore();
    await assertFails(
      spoofedDb.collection('cooperative_initiatives').doc('init-1').set({
        id: 'init-1',
        name: 'Spoofed Admin',
        status: 'ongoing'
      })
    );
  });

  it('Payload 3: should reject spoofed ownerId mismatch', async () => {
    const userDb = testEnv.authenticatedContext('attacker-123', {
      email: 'attacker@gmail.com',
      email_verified: true
    }).firestore();
    await assertFails(
      userDb.collection('cooperative_initiatives').doc('init-1').set({
        id: 'init-1',
        name: 'Spoofed Owner Initiative',
        ownerId: 'victim-456',
        status: 'ongoing'
      })
    );
  });
});
```
