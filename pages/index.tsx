import { Container } from '../components/ui/layout';
import { H1 } from '../components/ui/typography';
import { fetchGraphQL, gql } from '../utils';
import { DocumentRenderer } from '../schema/fields/content/renderers';

export default function Home({ posts }: any) {
  return (
    <Container>
      <H1>Hello World</H1>
      <div>
        {posts.map((post: any) => (
          <div key={post.id}>
            <h2>{post.title}</h2>
            {post.intro ? (
              <DocumentRenderer document={post.intro.document} />
            ) : null}
          </div>
        ))}
      </div>
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
        intro {
          document
        }
      }
    }
  `);
  return { props: { posts: data.allPosts }, revalidate: 60 };
}
