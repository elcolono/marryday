<template>
 <!--================Footer Area =================-->
    <footer class="ftco-footer ftco-bg-dark ftco-section">
        <div class="container">
            <div class="row mb-5">
                <div class="col-md">
                    <div class="ftco-footer-widget mb-4">
                        <h2 class="ftco-heading-2">MOWO Spaces</h2>
                        <!-- <p>{{ settings.theme.ThemeSettings.about_short_description}}</p> -->
                        <ul class="ftco-footer-social list-unstyled mb-0">
                            <li class="ftco-animate"><a href="#"><span class="fa fa-twitter"></span></a></li>
                            <li class="ftco-animate"><a href="#"><span class="fa fa-facebook"></span></a></li>
                            <li class="ftco-animate"><a href="#"><span class="fa fa-instagram"></span></a></li>
                        </ul>
                    </div>
                </div>
                <div class="col-md">
                    <!-- {% flat_menu 'useful_links' max_levels=1 show_menu_heading=True fall_back_to_default_site_menus=True %} -->
                </div>
                <div class="col-md">
                    <!-- {% flat_menu 'legal_links' max_levels=1 show_menu_heading=True fall_back_to_default_site_menus=True %} -->

                </div>
                <div class="col-md">
                    <div class="ftco-footer-widget mb-4">
                        <h2 class="ftco-heading-2">Office</h2>
                        <div class="block-23 mb-3">
                            {{JSON.stringify(data)}}
                            <ul>
                                <!-- <li><span class="mr-3 fa fa-map-marker"></span><span
                                        class="text">{{ settings.theme.ThemeSettings.about_address }}</span></li>
                                <li><a href="tel:{{ settings.theme.ThemeSettings.about_phone }}"><span
                                            class="mr-3 fa fa-phone"></span><span
                                            class="text">{{ settings.theme.ThemeSettings.about_phone }}</span></a></li>
                                <li><a href="mail:{{ settings.theme.ThemeSettings.about_email }}"><span
                                            class="mr-3 fa fa-envelope"></span><span
                                            class="text">{{ settings.theme.ThemeSettings.about_email }}</span></a></li> -->
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12 text-center">

                    <p>
                        <!-- Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. -->
                        Copyright &copy;
                        <script>document.write(new Date().getFullYear());</script> All rights reserved | This template
                        is made with <i class="fa fa-heart" aria-hidden="true"></i> by <a href="https://colorlib.com"
                            target="_blank">MOWO Spaces</a>
                        <!-- Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. -->
                    </p>
                </div>
            </div>
        </div>
    </footer>
        <!--================End Footer Area =================-->

</template>
<script>
export default {
  props: ["data"]
};
</script>