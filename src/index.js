import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ArticleProvider from "./store/articleProvider";
import "./index.css";
import App from "./App";
import Home from "./pages/Home";
import Article from "./pages/Article";
import Layout from "./components/Layout/Layout";
import AboutMe from "./pages/AboutMe";
import Contact from "./pages/Contact";
import NewArticle from "./pages/NewArticle";
import NotFound from "./pages/NotFound";

// import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <ArticleProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Home />} />
            <Route path="/article" element={<Article />}>
              <Route path=":artId" element={<Article />} />
            </Route>
            <Route path="/aboutme" element={<AboutMe />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/newarticle" element={<NewArticle />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </ArticleProvider>
  </BrowserRouter>
);

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
