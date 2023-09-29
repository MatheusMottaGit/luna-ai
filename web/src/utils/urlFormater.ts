export function format(url: string) {
  const [baseUrl, incompleteVideoID] = url.split('?v=')
  const [videoID, videoRunTime] = incompleteVideoID.split('&')

  return {
    embedURL: baseUrl.replace('watch', 'embed').concat(`/${videoID}`),
    videoID
  }
}