import FileUploader from "@/components/fileUploader";
import Layout from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import * as React from "react";

interface ICreatePostProps {}

const CreatePost: React.FunctionComponent<ICreatePostProps> = () => {
  return (
    <>
      <Layout>
        <div className="flex justify-center">
          <div className="border max-w-3xl w-full">
            <h3 className="bg-slate-800 text-white text-center text=lg p-2">
              First Post
            </h3>
            <div className="p-8 ">
              <form action="">
                <div className="flex flex-col">
                  <Label className="mb-4" htmlFor="caption">
                    Photo Caption
                  </Label>
                  <Textarea
                    className="mb-8"
                    id="caption"
                    placeholder="What's in your photo?"
                  />
                </div>
                <div className="flex flex-col">
                  <Label className="mb-4" htmlFor="photo">
                    Photos
                  </Label>
                  <FileUploader />
                </div>
                <Button className="mt-8 w-32" type="submit">
                  Post
                </Button>
              </form>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default CreatePost;
