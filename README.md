# time:matters Angular Challenge

## The Task

Fork this repository, create an Angular-based project (preferably using Angular Material components), and implement a small application.

**Goal:**  
Access aircraft data from the [ADSBdb API](https://www.adsbdb.com/) and display it in the browser.  
You should be able to search for aircraft by their registration code (to get details about the plane) or by their callsign (to get routing information).

Demo Link: https://68a30fdf2f56641ca6872413--coruscating-faun-b29a1d.netlify.app/

---

## Requirements

- A form with two elements:
  - A switch (e.g., radio box) to define the search type (aircraft/callsign)
  - An input field to enter one or more values (should support searching multiple values at once)
- Basic error handling for non-existing values or other API responses
- Visual representation of the results in a way you think makes sense—be creative!
- Use the [ADSBdb API](https://www.adsbdb.com/) (free and not limited)

## How to Use This App

1. **Start the application**  
   Run `ng serve` and open [http://localhost:4200/](http://localhost:4200/) in your browser.

2. **Select Search Type**  
   Use the radio buttons to choose between searching by:
   - **Aircraft Registration** (e.g., "N12345", "D-ABCD")
   - **Callsign** (e.g., "DLH400", "BAW123")

3. **Enter Search Values**  
   - Type one or more registration numbers or callsigns into the input field.
   - To search for multiple values at once, separate them with commas or spaces (e.g., `N12345, D-ABCD` or `DLH400 BAW123`).

4. **Submit the Form**  
   - Click the search button.
   - The app will display the results below the form, showing details for each aircraft or routing information for each callsign.

5. **Error Handling**  
   - If a value does not exist or the API returns an error, a message will be shown for that entry.

### Sample Values

- **Aircraft Registration:**  
  - `N12345` (US registration)  
  - `D-ABCD` (German registration)  
  - `G-EUPJ` (UK registration)

- **Callsign:**  
  - `DLH400` (Lufthansa flight)  
  - `BAW123` (British Airways flight)  
  - `AAL100` (American Airlines flight)

---

## Getting Started

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.1.6.

### Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

### Code scaffolding

To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics, run:

```bash
ng generate --help
```

### Building

To build the project, run:

```bash
ng build
```

The build artifacts will be stored in the `dist/` directory.

### Running unit tests

To execute unit tests with [Karma](https://karma-runner.github.io):

```bash
ng test
```

### Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

---

## Additional Resources


- [Development Guide](./Development.md)
- [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli)