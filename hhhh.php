<!-- index.php -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>United Kitchen</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <?php include 'header.php'; ?>

    <section class="hero">
        <div class="container">
            <h1>Welcome to United Kitchen</h1>
            <p>Delicious food delivered hot & fresh, anytime.</p>
            <a href="#services" class="btn">Explore Our Services</a>
        </div>
    </section>

    <section id="services" class="services">
        <div class="container">
            <h2>Our Services</h2>
            <div class="cards">
                <div class="card">
                    <h3>Master Chefs</h3>
                    <p>Expert chefs crafting culinary masterpieces.</p>
                </div>
                <div class="card">
                    <h3>Quality Food</h3>
                    <p>Only the freshest ingredients, every time.</p>
                </div>
                <div class="card">
                    <h3>Online Order</h3>
                    <p>Easy ordering through our website or app.</p>
                </div>
                <div class="card">
                    <h3>24/7 Service</h3>
                    <p>We are here for you around the clock.</p>
                </div>
            </div>
        </div>
    </section>

    <?php include 'footer.php'; ?>
</body>
</html>


