# Securiyt Specification: ABAC & Zero-Trust Architecture

This file formalizes the Zero-Trust database access policies for Quantum Web Code.

## 1. Data Invariants

- **Inquiries**: Anyone can submit an inquiry via the contact form. Only the authenticated administrator (`princewebdev01@gmail.com`) can read, list, update, or delete inquiry documents. 
- **Projects**: Only the authenticated administrator can create, edit, or delete portfolio projects. Guests (the general public) can read/list projects to view the agency showcase. No unauthorized modification is permitted.
- **Testimonials**: Only the authenticated administrator can create, edit, or delete client testimonial reviews. Guests can read/list testimonials.
- **SiteContent**: Only the authenticated administrator can write, update, or delete branding and section copy values. Guests can read branding documents.

---

## 2. The "Dirty Dozen" Malicious Payloads (TDD Matrix)

We test the security boundaries using twelve malicious payloads designed to attempt to leak, spoof, or overwrite records:

| Attempt ID | Target Collection | Operation | Malicious Action / Payload Field | Expected Result |
| :--- | :--- | :--- | :--- | :--- |
| `D1` | `inquiries` | `read` | Guest attempts to read/scrape all submitted client inquiries. | `PERMISSION_DENIED` |
| `D2` | `inquiries` | `update` | Unauthorized user attempts to mark an inquiry as read. | `PERMISSION_DENIED` |
| `D3` | `inquiries` | `delete` | Unauthorized user attempts to delete an inquiry document. | `PERMISSION_DENIED` |
| `D4` | `projects` | `create` | Guest attempts to post a rogue project to bypass portfolio list. | `PERMISSION_DENIED` |
| `D5` | `projects` | `update` | Non-admin attempts to edit a showcase project's URL or title. | `PERMISSION_DENIED` |
| `D6` | `projects` | `delete` | Unauthenticated user attempts to delete an active project. | `PERMISSION_DENIED` |
| `D7` | `testimonials` | `create` | Malicious client attempts to insert fake reviews dynamically. | `PERMISSION_DENIED` |
| `D8` | `testimonials` | `update` | Guest attempts to edit an existing testimonial document. | `PERMISSION_DENIED` |
| `D9` | `siteContent` | `update` | Unauthorized user attempts to overwrite header copywriting. | `PERMISSION_DENIED` |
| `D10` | `inquiries` | `create` | Submitting a packet without verified server timestamp context. | `PERMISSION_DENIED` |
| `D11` | `projects` | `update` | Admin override spoof using fake claims or custom user UIDs. | `PERMISSION_DENIED` |
| `D12` | `siteContent` | `create` | Attacking with an extremely large (1MB+) invalid content key. | `PERMISSION_DENIED` |

---

## 3. Test Runner Definition (Verification Blueprint)

All test assertions verify that the zero-trust rule blocks matching payloads. Security rules compile against:

```typescript
import { assertFails, assertSucceeds, initializeTestEnvironment } from "@firebase/rules-unit-testing";

// Standard Zero-Trust validation testing module
describe("Quantum Web Code Zero-Trust Rules", () => {
  it("forces global default deny on unmapped paths", async () => {
    // Blocks orphaned writes
  });
  it("allows public creation of inquiries while forbidding unauthorized reads", async () => {
    // Denies list to guest
  });
  it("grants complete admin dashboard read/writes to princewebdev01@gmail.com", async () => {
    // Allows admin read/writes
  });
});
```
