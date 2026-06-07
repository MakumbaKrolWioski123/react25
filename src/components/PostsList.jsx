import { useEffect, useState } from 'react'

function PostsList() {
  const [posts, setPosts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts?_limit=5')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error ${response.status}`)
        }
        return response.json()
      })
      .then((data) => {
        setPosts(data)
        setError(null)
      })
      .catch((fetchError) => {
        setError('Wystąpił błąd podczas ładowania postów.')
        console.error('Failed to load posts:', fetchError)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  if (isLoading) {
    return (
      <section>
        <h2>Posts</h2>
        <p>Ładowanie…</p>
      </section>
    )
  }

  if (error) {
    return (
      <section>
        <h2>Posts</h2>
        <p>{error}</p>
      </section>
    )
  }

  return (
    <section>
      <h2>Posts</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <strong>{post.title}</strong>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default PostsList
