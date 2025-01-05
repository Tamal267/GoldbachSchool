"use client";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { useActionState, useState } from "react";
import { AutosizeTextarea } from "./ui/autosize-textarea";
import { DateTimePicker } from "./ui/datetime-picker";

const initialState = {
  message: "",
  success: false,
};

export default function NewCourseForm({ type, loginAction }) {
  const [state, formAction, pending] = useActionState(
    loginAction,
    initialState,
  );
  const { date24, setDate24 } = useState(new Date());
  const [insEmails, setInsEmails] = useState([""]);
  return (
    <div className="pt-4">
      <div className="">
        <div className="bg-[url(/Assets/new_course_bg.svg)] bg-cover bg-top flex md:flex-row flex-col justify-around items-center p-12 min-h-screen">
          <div className="h-fit p-8 bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100 text-black flex flex-col gap-6 max-w-md flex-grow shadow-lg">
            <h1 className="text-bold text-2xl">New Course</h1>
            <form className="space-y-4" action={formAction}>
              <div className="space-y-2">
                <Label htmlFor="program">Program</Label>
                <div>
                  <Input
                    type="text"
                    id="program"
                    name="program"
                    className="bg-transparent rounded-lg w-full ring-0 border focus-visible:ring-offset-0 focus-visible:ring-0"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="name">Course Name</Label>
                <div>
                  <Input
                    type="text"
                    id="name"
                    name="name"
                    className="bg-transparent rounded-lg w-full ring-0 border focus-visible:ring-offset-0 focus-visible:ring-0"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <div>
                  <AutosizeTextarea
                    placeholder="Write description"
                    className="bg-transparent rounded-lg w-full ring-0 border focus-visible:ring-offset-0 focus-visible:ring-0 "
                    maxHeight={500}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="image">Image</Label>
                <div>
                  <Input
                    type="file"
                    id="image"
                    name="image"
                    className="bg-transparent rounded-lg w-full ring-0 border focus-visible:ring-offset-0 focus-visible:ring-0"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="version">Version</Label>
                <div>
                  <Select>
                    <SelectTrigger className="bg-transparent rounded-lg w-full ring-0 border focus-visible:ring-offset-0 focus-visible:ring-0">
                      <SelectValue placeholder="Version" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Bangla">Bangla</SelectItem>
                      <SelectItem value="English">English</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="routine">Routing</Label>
                <div>
                  <Input
                    type="file"
                    id="routine"
                    name="routine"
                    className="bg-transparent rounded-lg w-full ring-0 border focus-visible:ring-offset-0 focus-visible:ring-0"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="start_time">Start Time</Label>
                <div>
                  <DateTimePicker
                    hourCycle={24}
                    value={date24}
                    onChange={setDate24}
                    className="bg-transparent rounded-lg w-full ring-0 border focus-visible:ring-offset-0 focus-visible:ring-0 "
                  />
                </div>
              </div>

              {insEmails.map((email, index) => (
                <div key={index} className="space-y-2">
                  <Label htmlFor={`instructor-${index}`}>
                    Instructor {index + 1} Email
                  </Label>
                  <Input
                    type="email"
                    id={`instructor-${index}`}
                    name={`instructor-${index}`}
                    value={email}
                    onChange={(e) => {
                      const newEmails = [...insEmails];
                      newEmails[index] = e.target.value;
                      setInsEmails(newEmails);
                    }}
                    className="bg-transparent rounded-lg w-full ring-0 border focus-visible:ring-offset-0 focus-visible:ring-0"
                  />
                </div>
              ))}

              <div className="w-full flex items-center justify-center">
                <Button
                  onClick={() => setInsEmails([...insEmails, ""])}
                  type="button"
                >
                  {" "}
                  + Add Instructor
                </Button>
              </div>

              <div className="space-y-2">
                <Label htmlFor="per_class_tk">Per Class TK</Label>
                <div>
                  <Input
                    type="text"
                    id="per_class_tk"
                    name="per_class_tk"
                    className="bg-transparent rounded-lg w-full ring-0 border focus-visible:ring-offset-0 focus-visible:ring-0"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="per_evalution_tk">Per Evalution TK</Label>
                <div>
                  <Input
                    type="text"
                    id="per_evalution_tk"
                    name="per_evalution_tk"
                    className="bg-transparent rounded-lg w-full ring-0 border focus-visible:ring-offset-0 focus-visible:ring-0"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="course_fee">Course Fee</Label>
                <div>
                  <Input
                    type="text"
                    id="course_fee"
                    name="course_fee"
                    className="bg-transparent rounded-lg w-full ring-0 border focus-visible:ring-offset-0 focus-visible:ring-0"
                  />
                </div>
              </div>

              {state?.message && (
                <Alert variant={state?.success ? "default" : "destructive"}>
                  <AlertDescription>{state?.message}</AlertDescription>
                </Alert>
              )}

              <Button type="submit" className="w-full" disabled={pending}>
                {pending ? "Submitting..." : "Create Course"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
