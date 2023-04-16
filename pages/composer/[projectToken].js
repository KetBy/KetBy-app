import * as React from "react";
import { useRouter } from "next/router";
import axios from "../../src/utils/axios";

{
  /* 
  Retrieve the project from the API and then 
  redirect to /[projectToken]/[fileIndex], where fileIndex 
  is the smallest file_index of the project's files 
  */
}
export default function ComposerIndexPage() {
  return <></>;
}

export async function getServerSideProps(context) {
  const { projectToken } = context.query;
  const result = await axios.get(`/project/${projectToken}/first`);
  const data = result.data;

  if (data.file_index) {
    return {
      redirect: {
        destination: `/composer/${projectToken}/${data.file_index}`,
        permanent: false,
      },
    };
  } else {
    return {
      redirect: {
        destination: `/composer/${projectToken}/0`,
        permanent: false,
      },
    };
  }
}
