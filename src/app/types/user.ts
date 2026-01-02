export interface User {
  cell: string;
  dob: {
    date: string;
    age: number;
  };
  email: string;
  gender: string;
  id: {
    name: string;
    value: string;
  };
  location: {
    street: {
      number: number;
      name: string;
    };
    city: string;
    state: string;
    country: string;
    postcode: number;
  };
  login: {
    uuid: string;
    username: string;
    password: string;
    salt: string;
    md5: string;
    sha1: string;
    sha256: string;
  };
  name: {
    title: string;
    first: string;
    last: string;
  };
  nat: string;
  phone: string;
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
  registered: {
    date: string;
    age: number;
  };
}

export interface UsersResponse {
  info: {
    page: number;
    results: number;
    seed: string;
    version: string;
  };
  results: User[];
}

export interface UsersError {
  error: string;
}
