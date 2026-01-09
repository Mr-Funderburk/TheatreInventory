<?php

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $cid = $_POST["cid"];
    $name = $_POST["name"];
    $size = $_POST["size"];
    $type = $_POST["type"];
    $tags = $_POST["tags"];
    $imagePath = $_POST["imagePath"];
    // TODO: Upload the image

    if (empty($cid) || empty($name) || empty($size) || empty($type) || empty($tags)) {
        if (empty($cid)) { echo "<h1>Identifier is missing</h1>"; }
        if (empty($name)) { echo "<h1>Name is missing</h1>"; }
        if (empty($size)) { echo "<h1>Size is missing</h1>"; }
        if (empty($type)) { echo "<h1>Type is missing</h1>"; }
        if (empty($tags)) { echo "<h1>Tags is missing</h1>"; }
    } else {
        
    }
}