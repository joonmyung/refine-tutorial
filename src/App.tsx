import { Refine } from "@refinedev/core"
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import routerBindings, {
  DocumentTitleHandler, NavigateToResource,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import dataProvider from "@refinedev/simple-rest";
import {BrowserRouter, Outlet, Route, Routes} from "react-router-dom";
import "./App.css";
import {Layout} from "./components/layout";
import {GitHubBanner} from "@refinedev/core";
import { HeadlessInferencer} from "@refinedev/inferencer/headless";

function App() {
  return (
    <BrowserRouter>
      <GitHubBanner />
      <RefineKbarProvider>
        <DevtoolsProvider>
          <Refine
            routerProvider={routerBindings}
            dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
            resources={[
              {
                name: "blog_posts",
                list: "/blog-posts",
                show: "blog-posts/show/:id",
                create: "blog-posts/create",
                edit: "/blog-posts/edit/:id",
              }
            ]}
            options={{
              syncWithLocation: true,
              warnWhenUnsavedChanges: true,
              projectId: "S21lyg-RHjLEg-ZI4GWg",
            }}
          >
            <Routes>
              <Route element={<Layout>
                <Outlet /> </Layout>} />
              <Route index element={<NavigateToResource resource="blog_posts" />} />
              <Route path="blog-posts">
                <Route index element={<HeadlessInferencer />} />
                <Route path="show/:id" element={<HeadlessInferencer />} />
                <Route path="edit/:id" element={<HeadlessInferencer />} />
                <Route path="create" element={<HeadlessInferencer />} />
              </Route>
            </Routes>
            <RefineKbar />
            <UnsavedChangesNotifier />
            <DocumentTitleHandler />
          </Refine>
          <DevtoolsPanel />
        </DevtoolsProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
