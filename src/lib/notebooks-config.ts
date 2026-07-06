// GitHub repo that hosts the practice notebooks.
export const GITHUB_OWNER = "Marilyn-cc";
export const GITHUB_REPO = "ml-flow";
export const GITHUB_BRANCH = "main";
export const NOTEBOOKS_PATH = "notebooks";

/** Blob page on GitHub — renders the notebook + gives a "Raw" download button. */
export function githubUrl(filename: string) {
  return `https://github.com/${GITHUB_OWNER}/${GITHUB_REPO}/blob/${GITHUB_BRANCH}/${NOTEBOOKS_PATH}/${filename}`;
}

/** Opens the notebook directly in Colab (read-only playground, "Copy to Drive" to edit). */
export function colabUrl(filename: string) {
  return `https://colab.research.google.com/github/${GITHUB_OWNER}/${GITHUB_REPO}/blob/${GITHUB_BRANCH}/${NOTEBOOKS_PATH}/${filename}`;
}
