<?php
    $sql = "SELECT * from costume";
    $result = $db->query($sql);
    $rawData = $result->fetch_all();
    $count = count($rawData);
    $data = json_encode($rawData);
    $db->close();
?>

<script>const raw=<?php echo $data; ?>; let items=[]; raw.forEach(e=>{ items.push({ id: e[0], name: e[1], size: e[2], type: e[3], tagsString: e[4], tags: e[4].split(",").map(item=>item.trim()), img: e[5]});});</script>

<section id="pnlView">
    <h1>View Inventory</h1>
    <div id="fullImg" style="display:none;"></div>

    <input type="checkbox" id="cbFilterToggle">
    <label for="cbFilterToggle" id="lblFilterToggle"></label>
    <aside id="filter">
        <h2>Filter Inventory</h2>
        
        <div class="mat-text">
            <input type="text" id="txtFiltName" placeholder=" ">
            <label for="txtFiltName">Name</label>
        </div>
        
        <div class="mat-text">
            <input type="text" id="txtFiltSize" placeholder=" ">
            <label for="txtFiltSize">Size</label>
        </div>
        
        <div class="mat-text">
            <input type="text" id="txtFiltType" placeholder=" ">
            <label for="txtFiltType">Type</label>
        </div>
        
        <div class="mat-text">
            <input type="text" id="txtFiltTags" placeholder=" ">
            <label for="txtFiltTags">Tags</label>
        </div>

        <div style="text-align:center;">
            <label for="cbMatchAll" class="switch">
                <input type="checkbox" id="cbMatchAll">
                <i></i> 
                <span></span>
            </label>
        </div>

        <div>
            <a href="index.php" class="btn">Clear Filters</a>
            <a href="#" class="btn" id="applyFilters">Apply Filters</a>
        </div>
    </aside>

    <div id="itemsContainer"></div>
</section>