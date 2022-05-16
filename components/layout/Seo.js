import Head from 'next/head';

export default function Seo(props) {
  return (
    <Head>
      <title>{props.title}</title>
      <meta name='description' content={props.metaContent} />
    </Head>
  );
}
