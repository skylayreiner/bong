import { json, type LoaderArgs } from "@remix-run/node";
import { Outlet, Link, useLoaderData } from "@remix-run/react";
import React from "react";
import Table from "~/components/table";
import { getMatchById } from "~/models/match.server";
import { requireUser } from "~/session.server";

export default function RoundRoute() {
  return <h1>Table</h1>;
}
