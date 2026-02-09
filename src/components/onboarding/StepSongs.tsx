import { useSelector, useDispatch } from "react-redux";
import { Formik, FieldArray, Form, Field } from "formik";
import * as Yup from "yup";
import { RootState } from "@/store";
import { setSongs, setStep } from "@/store/onboardingSlice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Plus, Trash2 } from "lucide-react";

const validationSchema = Yup.object({
  songs: Yup.array()
    .of(Yup.string().required("Song name is required"))
    .min(1, "Add at least one song"),
});

const StepSongs = () => {
  const dispatch = useDispatch();
  const songsData = useSelector((s: RootState) => s.onboarding.songs);

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Favorite Songs</h2>
      <Formik
        initialValues={{ songs: songsData.songs.length ? songsData.songs : [""] }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          dispatch(setSongs({ songs: values.songs }));
          dispatch(setStep(3));
        }}
      >
        {({ values, errors, touched }) => (
          <Form className="space-y-4">
            <FieldArray name="songs">
              {({ push, remove }) => (
                <div className="space-y-3">
                  {values.songs.map((_, index) => {
                    const hasError = !!(errors.songs?.[index] && touched.songs?.[index]);
                    return (
                      <div key={index} className="flex items-end gap-2">
                        <div className="flex-1 space-y-1">
                          <Label htmlFor={`songs.${index}`}>Song {index + 1}</Label>
                          <Field name={`songs.${index}`}>
                            {({ field }: any) => (
                              <Input
                                {...field}
                                placeholder="Enter song name"
                                className={cn(hasError && "border-destructive")}
                              />
                            )}
                          </Field>
                          {hasError && (
                            <p className="text-sm text-destructive">
                              {errors.songs![index] as string}
                            </p>
                          )}
                        </div>
                        {values.songs.length > 1 && (
                          <Button type="button" variant="ghost" size="icon" onClick={() => remove(index)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    );
                  })}
                  <Button type="button" variant="outline" size="sm" onClick={() => push("")} className="gap-1">
                    <Plus className="h-4 w-4" /> Add Song
                  </Button>
                </div>
              )}
            </FieldArray>
            <div className="flex justify-between">
              <Button type="button" variant="outline" onClick={() => dispatch(setStep(1))}>
                Back
              </Button>
              <Button type="submit">Next</Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default StepSongs;
