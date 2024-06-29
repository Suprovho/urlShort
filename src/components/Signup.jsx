

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { BeatLoader } from "react-spinners";
import Error from "./error";
import * as Yup from "yup";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useFetch from "@/hooks/useFetch";
import { signup } from "@/db/apiAuth";
import { UrlState } from "@/context";

const Signup = () => {
  let [searchParams] = useSearchParams();
  const longLink = searchParams.get("createNew");
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name:"",
    email: "",
    password: "",
    profile_pic: null,
  });

  const handleInputChange = (e) => {
    const { name, value,files } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]:files?files[0]:value,
    }));
  };

  const handleSignup = async () => {
    setErrors([]);
    try {
      const schema = Yup.object().shape({
        name:Yup.string().required("name is required"),
        email: Yup.string()
          .email("Invalid email")
          .required("Email is required"),
        password: Yup.string()
          .min(6, "Password must be at least 6 characters")
          .required("Password is required"),
        profile_pic:Yup.mixed().required("Profile picture is required"),  
      });

      await schema.validate(formData, { abortEarly: false });
      await fnSignup();
    } catch (e) {
      const newErrors = {};
      e?.inner?.forEach((err) => {
        newErrors[err.path] = err.message;
      });

      setErrors(newErrors);
    }
  };

  const { data, error, loading, fn: fnSignup } = useFetch(signup, formData);
  const {fetchUser} = UrlState();

  useEffect(() => {
    console.log(data);
    if (error === null && data) {
      fetchUser();
      navigate(`/dashboard?${longLink ? `createNew=${longLink}` : ""}`);
    }
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, error]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Signup</CardTitle>
        <CardDescription>
        Create a new account if you haven&rsquo;t already
        </CardDescription>
        {error && <Error message={error.message} />}
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="space-y-1">
          <Input
            name="name"
            type="text"
            placeholder="Enter name"
            onChange={handleInputChange}
          />
          {errors.name && <Error message={errors.name} />}
        </div>
        <div className="space-y-1">
          <Input
            name="email"
            type="email"
            placeholder="Enter Email"
            onChange={handleInputChange}
          />
          {errors.email && <Error message={errors.email} />}
        </div>
        <div className="space-y-1">
          <Input
            name="password"
            type="password"
            placeholder="Enter Password"
            onChange={handleInputChange}
          />
          {errors.password && <Error message={errors.password} />}
        </div>
        <div className="space-y-1">
          <input
            name="profile_pic"
            type="file"
            accept="image/*"
            onChange={handleInputChange}
          />
        </div>
        {errors.profile_pic && <Error message={errors.profile_pic} />}
      </CardContent>
      <CardFooter>
        <Button onClick={handleSignup}>
          {loading ? <BeatLoader size={10} color="#36d7b7" /> : "Signup"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Signup;
