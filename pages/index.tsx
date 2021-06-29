import { Container } from '../components/ui/layout';
import { H1 } from '../components/ui/typography';
import { fetchGraphQL, gql } from '../utils';

export default function Home({ posts }: any) {
  return (
    <Container>
      <H1>Hello World</H1>
      <ul>
        {posts.map((post: any) => (
          <li>{post.title}</li>
        ))}
      </ul>
    </Container>
  );
}

export async function getStaticProps() {
  const data = await fetchGraphQL(gql`
    query {
      allPosts {
        id
        title
        status
        author {
          name
        }
      }
    }
  `);
  return { props: { posts: data.allPosts }, revalidate: 60 };
}
