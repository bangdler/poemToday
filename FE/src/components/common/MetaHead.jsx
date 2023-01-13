import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function MetaHead({ title, description, keywords, ogSiteName, ogDescription, ogImage, ogUrl }) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:site_name" content={ogSiteName} />
      <meta property="og:description" content={ogDescription} />
      <meta property="og:url" content={ogUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="800" />
      <meta property="og:image:height" content="400" />
      {/*<link rel="canonical" href={url} />*/}
    </Helmet>
  );
}
