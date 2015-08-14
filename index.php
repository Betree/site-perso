<!DOCTYPE html>
<html lang="en">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
  <meta name="HandheldFriendly" content="true" />
	<title>Benjamin Piouffle</title>
  <link rel="stylesheet" href="css/slicknav.css" />
	<link rel="stylesheet" href="css/style.css"/>
  <link rel="stylesheet" href="css/style_mobile.css"/>
  <link href='http://fonts.googleapis.com/css?family=Goudy+Bookletter+1911' rel='stylesheet' type='text/css'>
  <link href='http://fonts.googleapis.com/css?family=Wellfleet' rel='stylesheet' type='text/css'>
  <link href='http://fonts.googleapis.com/css?family=Wellfleet' rel='stylesheet' type='text/css'>
  <link href='http://fonts.googleapis.com/css?family=Arvo:400,700,400italic,700italic' rel='stylesheet' type='text/css'>
  <link href='http://fonts.googleapis.com/css?family=Oswald' rel='stylesheet' type='text/css'>
	<!-- Favicons -->
	<link rel="apple-touch-icon" sizes="57x57" href="img/favicon/apple-icon-57x57.png">
	<link rel="apple-touch-icon" sizes="60x60" href="img/favicon/apple-icon-60x60.png">
	<link rel="apple-touch-icon" sizes="72x72" href="img/favicon/apple-icon-72x72.png">
	<link rel="apple-touch-icon" sizes="76x76" href="img/favicon/apple-icon-76x76.png">
	<link rel="apple-touch-icon" sizes="114x114" href="img/favicon/apple-icon-114x114.png">
	<link rel="apple-touch-icon" sizes="120x120" href="img/favicon/apple-icon-120x120.png">
	<link rel="apple-touch-icon" sizes="144x144" href="img/favicon/apple-icon-144x144.png">
	<link rel="apple-touch-icon" sizes="152x152" href="img/favicon/apple-icon-152x152.png">
	<link rel="apple-touch-icon" sizes="180x180" href="img/favicon/apple-icon-180x180.png">
	<link rel="icon" type="image/png" sizes="192x192"  href="img/favicon/android-icon-192x192.png">
	<link rel="icon" type="image/png" sizes="32x32" href="/img/faviconfavicon-32x32.png">
	<link rel="icon" type="image/png" sizes="96x96" href="img/favicon/favicon-96x96.png">
	<link rel="icon" type="image/png" sizes="16x16" href="img/favicon/favicon-16x16.png">
	<link rel="manifest" href="/manifest.json">
	<meta name="msapplication-TileColor" content="#ffffff">
	<meta name="msapplication-TileImage" content="img/favicon/ms-icon-144x144.png">
	<meta name="theme-color" content="#ffffff">
	<!-- Captcha for the contact form -->
	<script src='https://www.google.com/recaptcha/api.js'></script>
</head>
<?php
	$sendMailResult = null;
	require_once("ContactForm.php");
	$contactForm = new ContactForm();
	if (array_key_exists("sendmail", $_POST) && $_POST["sendmail"] == 1) {
	    $sendMailResult = $contactForm->computeForm();
	}
?>
<body>
	<header id="header" class="fixed noselect">
		<div class="content">
			<div id="logo"><a href="#slide1"><img src="img/me.png" align="left" id="profilePicture"><h1> Benjamin Piouffle </h1></a></div>
            <div id="navContainer">
                <nav id="nav">
                    <ul id="menu">
                        <li><a href="#slide1" target-slide="1">About me</a></li>
                        <li><a href="#slide2" target-slide="2">Education</a></li>
                        <li><a href="#slide3" target-slide="3">Work</a></li>
                        <li><a href="#slide4" target-slide="4">Skills</a></li>
                        <li><a href="#slide5" target-slide="5">Interests</a></li>
                        <li><a href="#slide6" target-slide="6">Contact</a></li>
                    </ul>
                </nav>
                <div class="menuScrollProgress hidden"></div>
                <div id="responsiveMenuContainer"></div>
            </div>
            <?php
                if ($sendMailResult === true) {
                    echo("<div id='sendmailresult' class='success'>Your message has been sent !<span class='btnClose'>×</span></div>");
                } else if ($sendMailResult !== null) {
                    echo("<div id='sendmailresult' class='error'>Cannot send message : $sendMailResult<span class='btnClose'>×</span></div>");
                }
            ?>
		</div>
	</header>

    <div class="parallax">
        <div id="slide1" class="slide ">
            <div class="content">
                <h2>About me</h2>
                <p class="description" itemscope itemtype="http://data-vocabulary.org/Person">
                        My name is <span itemprop="name">Benjamin Piouffle</span>. I'm a French student currently studying abroad at <span itemprop="affiliation"><b>California State University of
                        <span itemprop="address" itemscope itemtype="http://data-vocabulary.org/Address">
                            <span itemprop="locality">Long Beach</span> in the USA
                         </span></b></span>.<br><br>
                        I study computer science since 4 years at the French school <span itemprop="affiliation"><b>Epitech</b></span> and I have worked as a <span itemprop="title">developer</span> for two IT companies along with my studies for more than a year.<br><br>
                        Programming is my job but also one of my passions !
                </p>
            </div>
        </div>

        <div id="slide2" class="slide">
            <div class="content" >
                <h2 style="color:black;">Education</h2>
                <div class="description_container">
                    <div class="description">
                        <div class="experienceBlock">
                            <img src="img/logo_csulb.png" class="experienceLogo">
                            <div class="experienceTitle"><span class="timePeriod">October 2014 – Present</span><br><b>California State University of Long Beach</b> (USA)</div>
                            <p>First semester: English<br>
                            Second semester: Security, Java, Operating Systems, Web Design</p>
                        </div>
                        <div class="experienceBlock">
                            <img src="img/logo_epitech.jpg" class="experienceLogo">
                            <div class="experienceTitle"><span class="timePeriod">October 2011 – June 2014</span><br><b>Epitech Marseille</b> (France)</div>
                            <p>First year: C, UNIX Systems, Security, SQL<br>
                                Second year: C++, Assembler, Web Security, Network<br>
                                Third year: Advanced C++, Java, Business Science<br>
                            </p>
                        </div>
                        <div class="experienceBlock">
                            <div class="experienceTitle"><span class="timePeriod">July 2011</span><br><b>Baccalauréat (French A level) with Honors</b></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


        <div id="slide3" class="slide">
            <div class="content">
                <h2>Work</h2>
                <div class="description">
                    <div class="experienceBlock">
                        <div class="experienceTitle"><span class="timePeriod">September 2013 – June 2014</span>: <b>Numvision</b> – Java/J2EE Developer</div>
                        <p>Numvision is a company located in south of France that provide file backup and synchronisation solutions for companies.
                            My work mainly consisted of improving the main company's product “Numsync”, creating a REST API
                            and automatizing the build of mobile applications.
                            <br>Main technologies : Java / J2EE, REST API, Android / IOS builds
                        </p>
                    </div>
                    <div class="experienceBlock">
                        <div class="experienceTitle"><span class="timePeriod">July 2012 – December 2012</span>: <b>E­Frogg</b> – Web Developer Internship</div>
                        <p>Internship at E­Frogg, a web agency. Development of a SEO analysis tool and work on various websites.<br>Main technologies : HTML, Javascript, JQuery, PHP, MySQL</p>
                    </div>
                    <div style="text-align:center;">
                        <button class="btn" id="btnExpandWorkExperiences">Show more work experience (Non IT related)</button>
                    </div>
                    <div id="secondaryExperiences" style="display:none;">
                        <div class="experienceBlock">
                            <div class="experienceTitle"><span class="timePeriod">August 2011 – September 2011</span>: <b>Sanary­ City Hall</b> – Summer job</div><p></p>
                        </div>
                        <div class="experienceBlock">
                            <div class="experienceTitle"><span class="timePeriod">January 2009 – May 2009</span>: <b>Independent</b></div>
                            <p>Computer lessons for individuals</p>
                        </div>
                        <div class="experienceBlock">
                            <div class="experienceTitle"><span class="timePeriod">July – August 2008</span>: <b>Mistral Diesel</b> – Inventory assistant</div><p></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>


        <div id="slide4" class="slide">
            <div class="content">
                <h2 style="color:black;">Skills</h2>

                    <div class="description">
                        <h3>Technologies</h3><hr>
                        <div class="col">
                            <h4>Software programming</h4>
                            <div class="row">
                                <div class="skillText">C</div>
                                <div class="skillText">C++</div>
                                <img class="skillLogo" height="75px" src="img/icons_skills/java.svg" title="Java / J2EE" alt="Java / J2EE" height="75px">
                                <img class="skillLogo" height="75px" src="img/icons_skills/arduino.png" title="Arduino" alt="Arduino">
                            </div>
                        </div>
                        <div class="col">
                            <h4>Scripting</h4>
                            <div class="row">
                                <div class="skillText">Shell script</div>
                                <img class="skillLogo" height="75px" src="img/icons_skills/python.svg" title="Python" alt="Python">
                            </div>
                        </div>
                        <div class="col">
                            <h4>Databases</h4>
                            <div class="row">
                                <img class="skillLogo" height="75px" src="img/icons_skills/mysql.svg" title="MySQL" alt="MySQL">
                                <img class="skillLogo" height="75px" src="img/icons_skills/postgresql.svg" title="PostgreSQL" alt="PostgreSQL">
                            </div>
                        </div>
                        <div class="col">
                            <h4>Web programming</h4>
                            <div class="row">
                                <img class="skillLogo" height="75px" src="img/icons_skills/php.svg" title="PHP" alt="PHP">
                                <img class="skillLogo" height="75px" src="img/icons_skills/html5.svg" title="HTML5" alt="HTML5">
                                <img class="skillLogo" height="75px" src="img/icons_skills/javascript.svg" title="Javascript" alt="Javascript">
                                <img class="skillLogo" height="75px" src="img/icons_skills/jquery.svg" title="JQuery" alt="JQuery">
                            </div>
                        </div>
                        <div class="col">
                            <h4>Operating systems</h4>
                            <div class="row">
                                <img class="skillLogo" height="75px" src="img/icons_skills/gnulinux.png" title="GNU/Linux" alt="GNU/Linux">
                                <img class="skillLogo" height="75px" src="img/icons_skills/windows.png" title="Windows" alt="Windows">
                                <img class="skillLogo" height="75px" src="img/icons_skills/android.jpg" title="Android" alt="Android">
                            </div>
                        </div>
                        <div class="col">
                            <h4>Tools</h4>
                            <div class="row">
                                <img class="skillLogo" height="75px" src="img/icons_skills/git.png" title="Git" alt="Git">
                                <img class="skillLogo" height="75px" src="img/icons_skills/svn.png" title="SVN" alt="SVN">
                                <img class="skillLogo" height="75px" src="img/icons_skills/bitcoin.png" title="Bitcoin" alt="Bitcoin">
                            </div>
                        </div>
                        <div class="col">
                            <h4>Others</h4>
                            <div class="row">
                                <div class="skillText">Restful APIs</div>
                                <div class="skillText">Agile software development</div>
                            </div>
                        </div>
                        <br><br>
                        <h3>Languages</h3><hr>
                        <div class="col">
                            <div class="row">
                                <div class="skillText">French (native)</div>
                                <div class="skillText">English (fluent) - TOEFL score : 89</div>
                                <div class="skillText">Italian (basic)</div>
                            </div>
                        </div>
                    </div>

            </div>
        </div>


        <div id="slide5" class="slide">
            <div class="content">
                <h2>Interests</h2>
                <div class="description_container">
                    <div class="description">
                        <h3>Music</h3><hr>
                        <div class="col">
                            <h4>Guitar</h4>
                            <p>I've been playing guitar for 8 years. My favorite thing is to improvise and my tastes being quite open, I could play with almost everything.<br>
                                I also sometimes try to record songs that I put on <a href="https://soundcloud.com/betree">soundcloud</a>.</p>
                        </div>
                        <div class="col">
                            <h4>Saxophone</h4>
                            <p>I played saxophone during 2 years when I was younger and I recently tried to get back to it. However I couldn't take it with me on the plane and can't wait to find it back when I'll come home.</p>
                        </div>
                        <h3>Sport</h3><hr>
                        <p>Hikking, trekking, bicycling</p>
                        <h3>Others</h3><hr>
                        <p>Travelling, motorcycling</p>
                    </div>
                </div>
            </div>
        </div>

        <div id="slide6" class="slide">
            <div class="content">
                <h2 style="color:black;">Contact</h2>
                <div class="description_container">
                    <div class="row">
                        <a href="#" id="contactFormButton">
                            <img src="img/icons_social/mail.png" class="contactIcon" title="Email" alt="Email">
                            <img src="img/icons_social/mailextended.png" style="display: none; margin-bottom: -4px;" id="contactIconExtension" title="Email" alt="Email">
                        </a>
                    </div>
                    <div class="row hidden" id="emailFormContainer">
                        <div class="formContainer">
                            <form method="POST">
                                <input hidden="hidden" type="number" name="sendmail" value="1"/>
                                <input type="email" name="email" placeholder="Your email" size="40" required autofocus="autofocus" value="<?php echo $contactForm->getFieldValueIfItExist("email"); ?>"/><br>
                                <textarea name="message" placeholder="Your message" rows="12" cols="70" required pattern=".{20,10000}" required title="Your message must be 20 to 10000 characters"><?php echo $contactForm->getFieldValueIfItExist("message"); ?></textarea><br>
                                <div style="display: inline-block;"><div class="g-recaptcha" data-sitekey="6LeKjgITAAAAAFigKFQbSV4Gt89fHrKHLUJN-ZW3"></div></div>
                                <button type="submit" value="Submit">Submit</button>
                            </form>
                        </div>
                    </div>
                    <div class="row">
                        <a href="https://github.com/Betree" target="_BLANK" class="hi-icon hi-icon-effect-8"><img src="img/icons_social/github.png" class="contactIcon" title="Github" alt="Github"></a>
                        <a href="http://stackoverflow.com/users/3584587/betree" target="_BLANK"><img src="img/icons_social/stackoverflow.png" class="contactIcon" title="Stackoverflow" alt="Stackoverflow"></a>
                        <a href="https://www.linkedin.com/in/benjaminpiouffle" target="_BLANK"><img src="img/icons_social/linkedin.png" class="contactIcon" title="Linkedin" alt="Linkedin"></a>
                    </div>
                    <div class="row">
                        <a href="https://plus.google.com/+BenjaminPiouffle" target="_BLANK"><img src="img/icons_social/google+.png" class="contactIcon" title="Google+" alt="Google+"></a>
                        <a href="https://www.facebook.com/benjamin.piouffle" target="_BLANK"><img src="img/icons_social/facebook.png" class="contactIcon" title="Facebook" alt="Facebook"></a>
                        <a href="https://twitter.com/Betree83" target="_BLANK"><img src="img/icons_social/twitter.png" class="contactIcon" title="Twitter" alt="Twitter"></a>
                    </div>
                    <div class="row">
                        <a href="http://www.lastfm.fr/user/Betree83" target="_BLANK"><img src="img/icons_social/lastfm.png" class="contactIcon" title="LastFM" alt="LastFM"></a>
                        <a href="https://soundcloud.com/betree" target="_BLANK"><img src="img/icons_social/soundcloud.png" class="contactIcon" title="Soundcloud" alt="Soundcloud"></a>
                    </div>
                </div>
            </div>

        </div>
        <script type="text/javascript" src="js/jquery-2.1.3.min.js"></script>
        <script type="text/javascript" src="js/jquery.slicknav.min.js"></script>
        <script type="text/javascript" src="js/jquery.easing.1.3.js"></script>
        <script type="text/javascript" src="js/main.js"></script>
    </div>
</body>
</html>
