
# My API Project

This is a Node.js API project built using **Koa**, **Joi**, **Winston**, and **Morgan**. The project includes both **unit tests** using Mocha and TestDouble, and **functional tests** using Playwright.

---

## Features

- **Endpoints:**
  - `POST /customers` - Create a new customer.
  - `PUT /customers/:id` - Update an existing customer.
- **Validation** with Joi for request data.
- **Logging** with Winston and Morgan.
- **Testing**:
  - Unit tests with Mocha and TestDouble.
  - Functional tests with Playwright.

---

## Project Structure

```
my-api-project/
├── src/
│   ├── app.js          # Main Koa application
│   ├── routes/
│   │   ├── customer.js # Customer routes
│   ├── controllers/
│   │   ├── customerController.js
│   ├── middlewares/
│   │   ├── logger.js   # Winston and Morgan logger middleware
│   ├── schemas/
│   │   ├── customer.js # Joi schemas
├── tests/
│   ├── unit/
│   │   ├── customerController.test.js # Mocha & TestDouble tests
│   ├── functional/
│   │   ├── fixtures/
│   │   │   ├── customer.json        # Playwright fixtures
│   │   ├── customer.test.js         # Playwright functional tests
├── playwright.config.ts  # Playwright configuration file
├── package.json
├── .env
├── .gitignore
├── README.md
```

---

## Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd my-api-project
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env` file in the root directory:
   ```plaintext
   PORT=3000
   ```

4. **Run the application**:
   ```bash
   node src/app.js
   ```

---

## Testing

1. **Run Unit Tests**:
   ```bash
   npx mocha tests/unit --recursive
   ```

2. **Run Functional Tests**:
   ```bash
   npx playwright test tests/functional
   ```

---

## Dependencies

- **Runtime**:
  - Koa
  - Joi
  - Winston
  - Morgan
- **Development**:
  - Mocha
  - TestDouble
  - Playwright

---

## Playwright Functional Tests

- Functional tests are configured in the `playwright.config.ts` file.
- Fixtures for creating and updating customer data are managed using a custom fixture (`customerFixture`).

---

## License

This project is licensed under the MIT License.
