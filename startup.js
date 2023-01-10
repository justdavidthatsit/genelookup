$(document).ready(function () {
  $('#example').DataTable({
    lengthMenu: [
      [50, 100, 200, -1],
      [50, 100, 200, 'All'],
    ],
  });
});