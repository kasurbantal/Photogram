import Layout from "@/components/layout";
import { useUserAuth } from "@/context/userAuthContext";
import { getPostByUserId } from "@/repository/post.service";
import type { DocumentResponse, Post } from "@/types";
import { HeartIcon } from "lucide-react";
import * as React from "react";

interface IMyPhotosProps {}

const MyPhotos: React.FunctionComponent<IMyPhotosProps> = () => {
  const { user } = useUserAuth();
  const [data, setData] = React.useState<DocumentResponse[]>([]);
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
      getAllPost(user.uid);
    }
  }, []);

  const renderPost = () => {
    return data.map((item) => (
      <div
        key={item.photos[0].uuid}
        className="relative group overflow-hidden rounded"
      >
        <div className="absolute inset-0 bg-transparent hover:bg-slate-950/75 transition-all duration-200 flex justify-center items-center">
          <div className="hidden group-hover:flex flex-col items-center space-y-2">
            <HeartIcon className="w-6 h-6 fill-white stroke-pink-500" />
            <div className="text-white">{item.likes}</div>
          </div>
        </div>
        <img
          src={`${item.photos[0].cdnUrl}/-/progressive/yes/`}
          alt="Uploaded"
          className="w-full h-auto object-cover"
        />
      </div>
    ));
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
