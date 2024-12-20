# Easy Flow 🧩

**Easy Flow** is a visual programming platform built with **Next.js** to simplify algorithm creation. With Easy Flow, you can design algorithms using **nodes and edges**, enabling structured and logical workflows without diving into complex code. Unlike drag-and-drop systems, Easy Flow offers a unique mechanism where every new node originates from an existing one. Start creating and connecting, step by step, with ease!

---

## 🚀 Features

- **Visual Algorithm Building**: Represent algorithms with clear and interactive visualizations.
- **Node-Based System**: Add new nodes starting from existing ones for structured workflows.
- **Simple Interface**: Intuitive design for users of all levels.

---

## 🛠️ Getting Started

Follow these steps to run Easy Flow locally:

### Prerequisites
- **Node.js** (v14+ recommended)
- **npm** or **yarn** installed globally

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/easy-flow.git
   cd easy-flow
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```


3. **Setup database**: 
    - Create a `.env` file in the root directory.
    - Add the following environment variables:
        ```bash
        MONGODB_URI=your_mongodb_uri
        ```

    - Replace `your_mongodb_uri` with your MongoDB connection string.
    - You can create a free MongoDB Atlas account [here](https://www.mongodb.com/cloud/atlas). 

4. **Run the development server**:
   ```bash
    npm run dev
    ```

    Now, you can open [http://localhost:3000](http://localhost:3000) in your browser.

### Contributing 🤝

Easy Flow is an open-source project and welcomes contributions from everyone. To contribute, follow these steps:

1. **Fork** this repository.
3. **Create a new branch** for your feature in your forked repository:
   ```bash
   git checkout -b feature/branch-name
   ```

4. **Make changes** and commit them:
   ```bash
    git commit -m "My changes"
    ```

5. **Push changes** to your branch:
    ```bash
    git push origin feature/branch-name
    ```

6. **Submit a pull request** to this repository.

