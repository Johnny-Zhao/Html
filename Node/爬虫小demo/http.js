var http = require('https');
var cheerio = require('cheerio');
var url = 'https://www.imooc.com/learn/494';

function filterChapter(html){
  var $ = cheerio.load(html);
  var chapters = $('.chapter');

  var courseData = [];
  chapters.each(function(index, el) {
    var chapter = $(this);
    var chapterTitle = chapter.find('strong').text();
    var videos = chapter.find('.video').children('li');
    var chapterData ={
      chapterTitle: chapterTitle,
      videos: []
    }
    videos.each(function(index, el) {
     var video = $(this).find('.J-media-item');
     var videoTitle = video.text();
     var id = video.attr('href').split('video/')[1];
     chapterData.videos.push({
      title: videoTitle,
      id: id
     })
    });
    courseData.push(chapterData);
  });
  return courseData
}

function printCourseInfo(courseData){
  var chapterTitle;
  var outputInfo = '';
  courseData.forEach(function(item) {
    chapterTitle = item.chapterTitle;
    outputInfo += chapterTitle.replace(/\s+/g, " ").slice(0, -6) + '\n';
    item.videos.forEach(function(video) {
      outputInfo += '['+ video.id + ']' +video.title.replace(/\s+/g, " ").slice(0, -6) + '\n';
    })
  })
  console.log(outputInfo);
}

http.get(url, function(res) {
  var html = '';
  res.on('data', function(data) {
    html += data;
  });
  res.on('end', function() {
    var courseData = filterChapter(html);
    printCourseInfo(courseData);
  });
}).on('error', function() {
  console.log('error');
})