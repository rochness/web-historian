#web-historian
A version of archive.org. This version allows users to submit a URL, which the app archives (by getting a copy of that website off of the internet and writing it to a local text file) and then the copy is displayed to the user when requested.

This application consists of two separate node applications.

The first is a web service that serves pages over the web using a RESTful API
It can accept URLs of sites that the user wants to archive.
It uses POST requests to save submitted URLS to a single file on the computer.
The second reads the list of URLs from that file and fetch the pages specified by those URLs from the internet, saving each web page into a file on your computer. This second app is configured to run on a scheduling using cron. 
