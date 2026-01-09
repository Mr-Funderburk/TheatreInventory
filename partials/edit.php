<?php
    if (isset($_GET['cid'])) {
        $cid = (int)$_GET['cid'];
        if ($cid > 0) {
            $stmt = $db->prepare("SELECT * FROM costume WHERE CostumeId=?");
            $stmt->bind_param("i", $cid);
            if ($stmt->execute()) {
                $result = $stmt->get_result();
                if ($result->num_rows > 0)
                    $item = $result->fetch_assoc();
            }
            $stmt->close();
            $db->close();
        } else {
            // no records found
            // redirect? error?
        }
    } else {
        // project not found
        // redirect? error?
    }
?>

<section id="pnlAdd">
    <h1>Edit Inventory</h1>
    <input type="hidden" id="cid" value="<?php echo $item["CostumeId"] ?>">

    <form action="POST" id="addInventory">
        <div style="text-align: center;">
            <p><strong>Current Image</strong></p>
            <img src="img/costume/<?php echo $item["ImagePath"] ?>" alt="<?php echo $item["Name"] ?>" style="width: 100px;">
        </div>
        
        <div class="addImage">
            <div class="upload">
                <a href="#" id="btn_up_file"><i class="fa-solid fa-upload"></i></a>
                <input type="file" accept="image/*" id="up_file" style="display:none;">
            </div>

            <div class="camera">
                <a href="#" id="btn_up_camera"><i class="fa-solid fa-camera"></i></a>
                <input type="file" accept="image/*" capture="camera" id="up_camera" style="display:none;">
            </div>
        </div>

        <p id="selectedFileName" class="note"></p>
        <input type="hidden" id="uploadType">

        <div class="mat-text">
            <!-- the css trick uses :not(:placeholder-shown) so the placeholder 
                here has to be present to work, but is an empty space -->
            <input type="text" id="txtName" placeholder=" " value="<?php echo $item["Name"] ?>" required>
            <label for="txtName">Name</label>
            <span class="error-textbox">Name is required</span>
        </div>

        <div class="mat-text">
            <input type="text" id="txtSize" placeholder=" " value="<?php echo $item["Size"] ?>" required>
            <label for="txtSize">Size</label>
            <span class="error-textbox">Size is required</span>
        </div>

        <div class="mat-text">
            <input type="text" id="txtType" placeholder=" " value="<?php echo $item["Type"] ?>" required>
            <label for="txtType">Type</label>
            <span class="error-textbox">Type is required</span>
        </div>

        <div class="mat-text">
            <textarea name="txtTags" id="txtTags" placeholder=" " data-gramm="false" data-gramm_editor="false" data-enable-grammarly="false"><?php echo $item["Tags"] ?></textarea>
            <label for="txtTags">Tags</label>
        </div>
        <p class="note">(Optional) Tags should be separated by a comma.</p>

        <a href="index.php" style="position: relative; left: 20%; color: #666;">Cancel</a>
        <div class="submitContainer">
            <div class="fa fa-check" id="submitDone"></div>
            <div class="fa fa-close" id="submitFailed"></div>
            <input type="submit" id="submitAdd" value="Submit">
        </div>
    </form>
</section>