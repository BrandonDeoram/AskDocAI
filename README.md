# AskDocAi

AskDocAi is a web application that enables users to upload documents and interact with ChatGPT, a powerful AI language model, to gain insights and answers related to the content of those documents. This README provides an overview of the application, its key features, and how to set it up.

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup](#setup)
- [Usage](#usage)
- [License](#license)

## Introduction

AskDocAi is designed to facilitate document analysis and provide quick, AI-driven responses to questions and discussions based on uploaded documents. It leverages several technologies, including Pinecone for document indexing, Neon DB for data storage, Drizzle for state management, Next.js for the web framework, TypeScript for type-safe coding, TailwindCSS for responsive UI design, and Stripe for premium services integration.

## Features

- **Document Upload:** Users can easily upload documents, which are then stored and indexed for analysis.
- **AI-Powered Insights:** Utilizes ChatGPT to provide answers and insights based on the content of the uploaded documents.
- **Search Functionality:** Users can search for specific information within documents.
- **Document Management:** Allows users to manage and categorize their uploaded documents.
- **Premium Services:** Integration with Stripe for premium services, such as advanced analytics and faster response times.

## Technologies Used

- **Pinecone:** For document indexing and retrieval.
- **Neon DB:** As the primary data storage solution.
- **Drizzle:** For state management and real-time updates.
- **Next.js:** As the web framework, providing server-side rendering and a smooth user experience.
- **TypeScript:** For type-safe coding, improving code quality and maintainability.
- **TailwindCSS:** For responsive and easy-to-maintain UI design.
- **Stripe:** For secure and seamless payment processing.

## Setup

To set up AskDocAi on your local machine, follow these steps:

1. Clone the repository from GitHub:

   ```bash
   git clone https://github.com/yourusername/AskDocAi.git
   ```

2. Install dependencies:

   ```bash
   cd AskDocAi
   npm install
   ```

3. Configure environment variables:

   - Create a `.env.local` file in the root directory of your project.
   - Add the necessary environment variables, such as Pinecone API keys, Neon DB credentials, Stripe keys, and any other required settings.

4. Run the development server:

   ```bash
   npm run dev
   ```

5. Open your web browser and navigate to `http://localhost:3000` to access AskDocAi locally.

## Usage

1. Register and log in to your AskDocAi account.
2. Upload your documents.
3. Use the ChatGPT feature to ask questions or seek insights related to the uploaded documents.
4. Explore premium services provided by Stripe.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

Feel free to contribute, report issues, or submit feature requests to enhance the AskDocAi project. Enjoy using AskDocAi to make document analysis and information retrieval easier and more efficient!
