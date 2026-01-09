<section id="pnlAdd" style="display:none;">
    <h1>Add Inventory</h1>

    <form action="POST" id="addInventory">
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
            <input type="text" id="txtName" placeholder=" " required>
            <label for="txtName">Name</label>
            <span class="error-textbox">Name is required</span>
        </div>

        <div class="mat-text">
            <input type="text" id="txtSize" placeholder=" " required>
            <label for="txtSize">Size</label>
            <span class="error-textbox">Size is required</span>
        </div>

        <div class="mat-text">
            <input type="text" id="txtType" placeholder=" " required>
            <label for="txtType">Type</label>
            <span class="error-textbox">Type is required</span>
        </div>

        <div class="mat-text">
            <textarea name="txtTags" id="txtTags" placeholder=" " data-gramm="false" data-gramm_editor="false" data-enable-grammarly="false"></textarea>
            <label for="txtTags">Tags</label>
        </div>
        <p class="note">(Optional) Tags should be separated by a comma.</p>

        <div class="submitContainer">
            <div class="fa fa-check" id="submitDone"></div>
            <div class="fa fa-close" id="submitFailed"></div>
            <input type="submit" id="submitAdd" value="Submit">
        </div>
    </form>
</section>