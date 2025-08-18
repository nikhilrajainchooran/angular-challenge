## Development Guide

### 1. Install Dependencies

Run the following command in the project root to install all required packages:

```bash
npm install
```

---

### 2. Start the Development Server

Launch the app locally with:

```bash
ng serve
```

Open your browser and go to [http://localhost:4200/](http://localhost:4200/).

---

### 3. Code Structure

- **src/app/**: Main application code (components, services, modules, etc.)
- **src/styles.scss**: Global styles and Angular Material theming
- **src/app/app.routes.ts**: Application routes
- **src/app/app.config.ts**: Angular application configuration

---

### 4. Main Features

- Search for aircraft by registration or callsign using the ADSBdb API
- Switch between search types (registration/callsign)
- Enter multiple values separated by commas or spaces
- Results are displayed below the search form
- Basic error handling for invalid or missing data

---

### 5. Useful Commands

- **Generate a new component:**
  ```bash
  ng generate component component-name
  ```
- **Run unit tests:**
  ```bash
  ng test
  ```
- **Build the app for production:**
  ```bash
  ng build
  ```

---

### 6. Sample Search Values

- **Aircraft Registration:** `N12345`, `D-ABCD`, `G-EUPJ`
- **Callsign:** `DLH400`, `BAW123`, `AAL100`

---

For more details, see the Angular CLI