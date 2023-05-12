import IUser from "../interface/user.interface";

const updateUser: Function = (field: string, value_: any, setter: Function) => {
  setter((current: IUser) =>
    Object.entries(current).reduce(
      (acc: { [key: string]: any }, [key, value]) => {
        if (key === field) acc[key] = value_;
        else acc[key] = value;
        return acc;
      },
      {}
    )
  );
};

export default updateUser;
