# Running "Exhibit-it" React App

## Netlify Version:
   https://exhibitit.netlify.app/

## Running Locally:

## Environment Requirements:

To run the "Exhibit-it" React app locally, ensure you have the following environment set up:

1. **Node.js and npm:**

   - Install Node.js from nodejs.org (npm is included with Node.js).
   - **Minimum Required Versions:**
     - Node.js: 20.6.1 or higher
     - npm: 10.8.1 or higher

2. **Package Manager:**
   - npm is used as the package manager to install dependencies and run scripts.

3. **Rijk's Museum API key**
   - obtain an API key from Rijks Museum Website. Register for a Rijksstudio account. You will be given a
   key instantly upon request, which you can find at the advanced settings of your Rijksstudio account.

## Installation Steps:

### 1. Clone the Repository:

   Clone the Git repository of "Exhibit-it" to your local machine:
   ```bash
   git clone https://github.com/sirbacharach/exhibit-it.git
   cd exhibit-it
   ```

### 2. Install Dependencies:
```bash
npm install
```

### 3. Create .env file then add your key:
create a .env file in the root directory as follows:
```bash
touch .env
```

Edit the file with your preferred text editor and add the following information replacing "your_key" with your actual Rijk's Museum API key that you prepared earlier:
```bash
VITE_RIJK_API_KEY=your_key
```
Save your changes to the .env file.

### 4. Run the Development Server:
```bash
npm run dev
```
### 5. Accessing the App:

Open your web browser and navigate to http://localhost:3000 (or whichever address is specified in the command prompt) to view and interact with the "Exhibit-it" React app.

Notes:

- Ensure that all npm scripts are executed within the project directory where package.json is located.

- For any issues or errors, refer to the terminal output for debugging information.