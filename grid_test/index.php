<!DOCTYPE html>
<html lang="ru">
<head>
    <title>TEST</title>
    <link href="https://fonts.googleapis.com/css?family=Hind" rel="stylesheet"> 
    <link rel="stylesheet" href="style.css">
    <meta charset="utf-8">
</head>
<body>

    <?php
        $path = strtolower($_POST['path']);
        $file = $path.".html";

        if(file_exists($file)) {
            readfile($path.".html");
        } else {
            readfile("main.html");
        }
    ?>

        <div class="item menu">
            <div class="nav">
                <form action="" method="POST">
                    <div class="item"><h1>Navigation</h1></div>
                    <div class="item"><input type="submit" name='path' value="Home"></div>
                    <div class="item"><input type="submit" name='path' value="About"></div>
                    <div class="lang item" onClick="form.submit()"><b>LV</b></div>    
                </form>
            </div>
        </div>
            
    </div>

</body>
</html>