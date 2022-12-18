import * as React from "react";
import dynamic from "next/dynamic";
import axios from "../../../src/utils/axios";

const PageContent = dynamic(
  () => import("../../../src/components/auth/ConfirmPage"),
  {
    suspense: true,
  }
);

export default function AuthConfirmPage({ data }) {
  return (
    <React.Suspense fallback={`Loading...`}>
      <PageContent data={data} />
    </React.Suspense>
  );
}

export async function getServerSideProps({ query, req }) {
  const { token } = query;

  let data = {};

  await axios
    .post("/auth/confirm", {
      token: token,
    })
    .then((res) => {
      data = res.data;
    })
    .catch((err) => {
      data = {
        success: false,
        message: "Something went wrong. Please try again later.",
      };
    });

  return {
    props: { data },
  };
}
