<?php

/* LOCAL */
const DB_USERNAME = "root";
const DB_PASSWORD = "";

const DB_SERVER = "localhost";
const DB_DATABASE = "canterbury_theatre_inventory";

$db = new mysqli(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_DATABASE);
if ($db->connect_error) { exit("Connection Failed: $db->connect_error"); }

function logError($msg, $path="../") { error_log("[".date("h:i:s A")."]  ".$msg."\n", 3, $path."logs/".date("Y-m-d")."_error.log"); }
function logSql($msg, $path="../") { error_log("[".date("h:i:s A")."]  ".$msg."\n", 3, $path."logs/".date("Y-m-d")."_sql.log"); }
function logTesting($msg, $path="../") { error_log("[".date("h:i:s A")."]  ".$msg."\n", 3, $path."logs/".date("Y-m-d")."_testing.log"); }
