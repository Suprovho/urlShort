import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { LinkIcon, LogOut, User } from "lucide-react";
import { UrlState } from "@/context";
import useFetch from "@/hooks/useFetch";
import { logout } from "@/db/apiAuth";
import { BarLoader } from "react-spinners";
const Header = () => {
  const navigate = useNavigate();
  const { user, fetchUser } = UrlState();

  const { loading, fn: fnLogout } = useFetch(logout);

  return (
    <>
    <nav className="py-4 flex justify-between items-center">
      <Link to={"/"}>
        <img src="./logo.png" alt="logo" className="h-20" />
      </Link>
      <div>
        {!user ? (
          <Button onClick={() => navigate("/auth")}>Login</Button>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger className="w-10 rounded-full overflow-hidden">
              <Avatar>
                <AvatarImage
                  src={user?.user_metadata?.profile_pic}
                  className="object-contain"
                />
                <AvatarFallback className="object-contain"><User /></AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>{user?.user_metadata?.name}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="">
                <LinkIcon className="m-2 h-4 w-4" />
                <span>My Links</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-red-400"
                onClick={() => {
                  fnLogout().then(() => {
                    fetchUser();
                    navigate("/");
                  });
                }}
              >
                <LogOut className="m-2 h-4 w-4" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </nav>
     {loading && <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />}
    </>
  );
};

export default Header;
