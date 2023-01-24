$(function () {
    let mediumPromise = new Promise(function (resolve) {
        let $content = $('#jsonContent');
        let data = {rss: 'https://medium.com/feed/@akbarhlubis'};

        // use http://jsonviewer.stack.hu/ to check json file easier
        $.get(
            'https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fmedium.com%2Ffeed%2F%40akbarhlubis',
            data,
            function (response) {
                if (response.status == 'ok') {
                    let display = '';
                    debugger
                    $.each(
                        response.items,
                        function (k, item) {
                            display += `<div class="mb-12 p-4 lg:w-2">`; //mb-12 p-4 md:w-12
                            display += `<div class="card medium-card">`;
                            let src = item["thumbnail"]; // use thumbnail url
                            display += `  <span>
                                            <img src="${src}" class="card-img-top" alt="Cover image">
                                          </span>`;
                            display += `  <div class="card-body">`;
                            display += `    <h5 class="card-title">${item.title}</h5>`;
                            
                            // add categories
                            display += '    <p>'
                            let categories = item["categories"];
							for (const element of categories){
                            	display += `  <a class="category" href="#"><i>#${element}</i></a> &nbsp;`
                            }
							display += '    </p>'
                            
                            display += `    <a href="${item.link}" target="_blank" class="btn" >Read More</a>`;
                            display += `  </div>
                                        </div>
                                    </div>`;
                            return k < 10;
                        }
                    );
                    resolve($content.html(display));
                }
            }
        );
    });
    
    mediumPromise.then(function() {
        //Pagination
        let pageSize = 4;
        let pageCount = $(".medium-card").length / pageSize;
        for (let i = 0; i < pageCount; i++) {
            $("#pagin").append(`<a class="page-link" href="#">${(i + 1)}</a>`);
        }

        $("#pagin a:nth-child(1)").addClass("active");
        let showPage = function (page) {
            $(".medium-card").hide();
            $(".medium-card").each(function (n) {
                if (n >= pageSize * (page - 1) && n < pageSize * page)
                    $(this).show();
            });
        }

        showPage(1);

        $("#pagin a").click(function () {
            $("#pagin a").removeClass("active");
            $(this).addClass("active");
            showPage(parseInt($(this).text()))
            return false;
        });
    });
  
});