export default async function ({ query, enablePreview }) {
  if (query.preview) {
    await enablePreview()
  }
}
