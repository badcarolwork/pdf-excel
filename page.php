<?php get_header(); ?>
    <link rel="stylesheet" href="/assets/css/gallery-style.css" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/html2pdf.js@0.10.1/dist/html2pdf.bundle.min.js"></script>
<style>
    .tag-container {
        width: 100%;
        height: fit-content;
        margin-bottom: 20px;
        opacity: 0;
        visibility: hidden;
    }
    #desktop-ad {
        display: none;
        width: 1024px;
    }
    #mobile-ad{
        width: 363px;
        height: 760px;
        display: none;
    }
    .desktop-ad, .mobile-ad{
        position: relative; 
    }
    .desktop-bg{
        width: 1024px;
        min-width: 1024px;
    }
    .mobile-bg{
        width: 358px;
    }
    .ad-size {
        position: absolute;
	}
    .gallery-inner {
        width: 100%;
    }
@media only screen and (max-width: 767px) {
    .gallery-inner-page header{
    	background-color: #fff;
    }
}
    .description-container {
        padding: 0px 12px 35px 0px;
    	font-size: 14px;
    	max-width: 1024px;
    }
	.description-container p {
		margin-bottom: 10px;
	}
	.ad-desc{
        font-size: 16px;
    	font-weight: 800;
    }
</style>
<section class="gallery-inner-section">
<a class="btn-back" href="/gallery">
            <div class="back-box">
                <img src="<?php echo kult_upload_img_url('2025/06/icon-arrow-left.svg'); ?>" alt="Arrow-left">
            </div>
            <h5>Back to gallery page</h5>
        </a>
    	<div id="specDL-download">
    		<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
			<path d="M12 2a1 1 0 0 1 1 1v9.59l2.3-2.3a1 1 0 1 1 1.4 1.42l-4.01 4a1 1 0 0 1-1.38 0l-4.01-4A1 1 0 1 1 8.7 10.3l2.3 2.3V3a1 1 0 0 1 1-1z"/>
			<path d="M4 16a1 1 0 0 1 1 1v3h14v-3a1 1 0 1 1 2 0v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-3a1 1 0 0 1 1-1z"/>
			</svg>
    <div id="specDL-download-dot"></div>
			<!--div id="specDL-card-collapse">Download List</div-->
    	</div>
    
    <div class="gallery-inner-row">
        <div class="gallery-inner ad-container">
            <?php
            $featured_tag = get_field('gallery_tag');
            if (!empty($featured_tag)): ?>
                <div id="tag-container" class="tag-container">
                    <?php echo $featured_tag; ?>
                </div>
            <?php endif; ?>
        </div>
		
        <div class="gallery-inner ad-desc-container">
            <!-- <div class="h5 date"><?php echo get_the_date('d F Y'); ?></div> -->
            <h1 id="desc-title" class="h2"><?php the_title(); ?></h1>
                <div id="desc-dropdown">
			<svg fill="#000000" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
	 width="24px" height="24px" viewBox="0 0 30.727 30.727"
	 xml:space="preserve">
			<g><path d="M29.994,10.183L15.363,24.812L0.733,10.184c-0.977-0.978-0.977-2.561,0-3.536c0.977-0.977,2.559-0.976,3.536,0
		l11.095,11.093L26.461,6.647c0.977-0.976,2.559-0.976,3.535,0C30.971,7.624,30.971,9.206,29.994,10.183z"/></g>
			</svg>
        </div>
            <?php
            $blog_author = get_field('blog_author');
            if (!empty($blog_author)): ?>
                <div class="author">
                    <span>Written by</span> <?php echo esc_html($blog_author); ?>
                </div>
            <?php endif; ?>
            <?php
            $template_desc = get_field('gallery_text');
            if (!empty($template_desc)): ?>
                <div class="description-container">
                    <?php echo $template_desc; ?>
                </div>
            <?php endif; ?>
                
            <?php $slug = esc_attr( get_post()->post_name); ?>
			<?php if ( !get_field('hide_from_gallery') ) : ?>
                <div id="addCart">
                    <a class="pill-btn" data-add-slug="<?php echo $slug ?>">
                        <span class="badge">＋</span> Add to download
                    </a>
                </div>
            <?php endif; ?>
        </div>
        
        <div id="specDL-card" class="specDL-card">
            <div id="specDL-card-close">×</div>
			<!--h2 style="margin-top:0;">Your Download List</h2-->
            <div id="list"></div>
			<div id="specDL-download-btn" class="row" style="margin-top:12px;">
				<a class="pill-btn" onclick="downloadPdf()">
					<div class="badge badge-pdf"></div> PDF
            	</a>
                <a class="pill-btn" onclick="downloadExcel()">
					<div class="badge badge-xls"></div> Excel
            	</a>
    			<a class="pill-btn secondary" onclick="clearList()">
      				<span class="badge">×</span> Clear
    			</a>
                <div class="small" style="margin-top:8px;">Max 5 specs.</div>
  		</div>
 
</div>

<div id="specDL-render-stage"></div>
        <script>
            function observeWidth() {
                const target = $("body")[0]; // get raw DOM element
                const ro = new ResizeObserver(entries => {
                    for (let entry of entries) {
                        const width = $(entry.target).width();
                        console.log("New width:", width);
                        if(width<769){
                            hideDesktop();
                        }else{
                            showDesktop();
                        }
                    }
                });
                ro.observe(target);
            }
            function showDesktop(){
                $(".desktop-ad").css("display", "block");
                $(".mobile-ad").css("display", "none");
            }
            function hideDesktop(){
                $(".mobile-ad").css("display", "block");
                $(".desktop-ad").css("display", "none");
            }
            window.onload = function () {
                observeWidth();
                //observeWidth2(); //function is spec-download.js
                document.getElementById("tag-container").style.opacity = "1"; 
                document.getElementById("tag-container").style.visibility = "visible"; 
            }

        </script>
		    <script src="/assets/js/ad-spec-data.js"></script>
        <script src="/assets/js/spec-download.js"></script>

    </div>
</section>

<?php get_footer(); ?>
