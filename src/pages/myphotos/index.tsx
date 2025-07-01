import Layout from "@/components/layout";
import { useUserAuth } from "@/context/userAuthContext";
import { getPostByUserId } from "@/repository/post.service";
import type { DocumentResponse, Post } from "@/types";
import * as React from "react";

interface IMyPhotosProps {}

const MyPhotos: React.FunctionComponent<IMyPhotosProps> = () => {
  const { user } = useUserAuth;
  const { data, setData } = React.useState<DocumentResponse[]>([]);
  const getAllPost = async (id: string) => {
    try {
      const querySnapshot = await getPostByUserId(id);
      const tempArr: DocumentResponse[] = [];
      if (querySnapshot.size > 0) {
        querySnapshot.forEach((doc) => {
          const data = doc.data() as Post;
          const responseObj: DocumentResponse = {
            id: doc.id,
            ...data,
          };
          console.log("The response object is: ", responseObj);
          tempArr.push(responseObj);
        });
        setData(tempArr);
      } else {
        console.log("No such document");
      }
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    if (user != null) {
      getAllPost(user.id);
    }
  }, []);

  const renderPost = () => {
    return data.map((item) => {
      <div key={item.photo[0].uuid} className="relative">
        {/* <div className="absolute transition-all duration"></div> */}
        <img src={`${item.photos[0].cdnUrl}/-/progressive/yes/`} />
      </div>;
    });
  };

  return (
    <>
      <Layout>
        <div className="flex justify-center">
          <div className="border max-w-3xl w-full">
            <h3 className="bg-slate-800 text-white text-center text-lg p-2">
              My Photos
            </h3>
            <div className="p-8">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {data ? renderPost() : <div>...Loading</div>}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default MyPhotos;
