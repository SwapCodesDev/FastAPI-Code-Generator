
"use client";

import { Wand, Sparkles, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CodeEditor } from "@/components/pygenius/CodeEditor";
import { LoadingSpinner } from "@/components/pygenius/LoadingSpinner";
import type { FileContent } from "@/components/pygenius/types";

interface CodeEditorCardProps {
  title: string;
  value: string;
  onChange: (value: string) => void;
  onGenerate: () => void;
  onFix: () => void;
  onCopy: () => void;
  isGenerating: boolean;
  isFixing: boolean;
  anyLoading: boolean;
  section: keyof FileContent;
}

export function CodeEditorCard({
  title,
  value,
  onChange,
  onGenerate,
  onFix,
  onCopy,
  isGenerating,
  isFixing,
  anyLoading,
  section,
}: CodeEditorCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between p-4">
        <div className="space-y-1">
          <CardTitle className="font-headline text-lg">{title}</CardTitle>
          <CardDescription>
            Enter code manually or use AI to generate or fix the content.
          </CardDescription>
        </div>
        <div className="flex gap-2">
           <Button variant="ghost" size="icon" onClick={onCopy} disabled={anyLoading || !value} aria-label={`Copy ${title}`}>
            <Copy />
          </Button>
          <Button variant="outline" onClick={onGenerate} disabled={anyLoading || isGenerating} aria-label={`Generate ${title}`}>
            {isGenerating ? <LoadingSpinner /> : <Sparkles />}
          </Button>
          <Button onClick={onFix} disabled={anyLoading || isFixing} aria-label={`Fix ${title}`}>
            {isFixing ? <LoadingSpinner /> : <Wand />}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <CodeEditor
          value={value}
          onChange={onChange}
          placeholder={`Enter ${section} code here...`}
          disabled={anyLoading}
        />
      </CardContent>
    </Card>
  );
}
