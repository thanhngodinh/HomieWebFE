import { useEffect } from "react";
import { collection, query } from "firebase/firestore";
import database from "./config";

type Codition = {
    fieldName:string,
    operator: string,
    value: string
}
