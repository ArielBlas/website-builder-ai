import React, { ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import SyntaxHighlighter from "react-syntax-highlighter";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";

type Props = {
  children: ReactNode;
  code: string;
};

const ViewCodeBlock = ({ children, code }: Props) => {
  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="min-w-7xl max-h-[600px] overflow-auto">
        <DialogHeader>
          <DialogTitle>
            <div className="flex gap-4 items-center">
              Source Code{" "}
              <span>
                <Button>
                  <Copy />
                </Button>
              </span>
            </div>
          </DialogTitle>
          <DialogDescription>
            <div>
              <SyntaxHighlighter>{code}</SyntaxHighlighter>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ViewCodeBlock;
