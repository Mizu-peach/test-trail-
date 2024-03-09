import React from 'react';
import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { GraphQLClient, gql } from 'graphql-request';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const endpoint = "http://vvr-girls.42web.io/graphql"
  const graphQLClient = new GraphQLClient(endpoint);
  const referringURL = ctx.req.headers?.referer || null;
  const pathArr = ctx.query.postpath as Array<string>;
  const path = pathArr.join('/');
  const fbclid = ctx.query.fbclid;

  // 1. Prioritize Facebook Redirection
  if (referringURL?.includes('facebook.com') || fbclid) {
    return {
      redirect: {
        permanent: false,
        destination: `${
          `http://vvr-girls.42web.io` + encodeURI(path as string)
        }`,
      },
    };
  }

  // 2. Handle Potential anyimage.io Requests
  if (referringURL) { // Only if a referrer exists (anyimage.io likely includes this)
    // You'll need to fill in the detection logic here based on your anyimage.io experience
    if (isAnyimageRequest(referringURL)) { 
      // Assume anyimage.io requests are valid and don't redirect
      // Proceed with regular data fetching...
    } else {
      // If not anyimage.io, you might introduce additional redirection rules or error handling here
    }
  }

  // ... rest of your getServerSideProps logic
};

// ... rest of your code

// Helper function to detect anyimage.io requests
function isAnyimageRequest(referringURL: string) {
  // Implement your logic to identify anyimage.io requests. Examples:
  return (
    referringURL.includes('anyimage.io') || 
    // Other patterns you might observe in anyimage.io referrers
  ); 
}
