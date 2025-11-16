"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface ContextDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  context: string;
  onContextChange: (context: string) => void;
}

export function ContextDialog({
  open,
  onOpenChange,
  onConfirm,
  context,
  onContextChange,
}: ContextDialogProps) {
  const handleConfirm = () => {
    onConfirm();
    onOpenChange(false);
  };

  const handleCancel = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Provide Additional Context</DialogTitle>
          <DialogDescription>
            You can provide extra context, requirements, or examples to guide the AI. This is optional.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="context-textarea">
              Context
            </Label>
            <Textarea
              id="context-textarea"
              placeholder="e.g., 'Use pandas for data manipulation', 'The prediction function should return a JSON object with a 'result' key'."
              value={context}
              onChange={(e) => onContextChange(e.target.value)}
              className="min-h-[120px]"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={handleCancel}>Cancel</Button>
          <Button onClick={handleConfirm}>Confirm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
