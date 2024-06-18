#ifndef ROUTEINFONODE
#define ROUTEINFONODE

#include <stdio.h>
#include <iostream>
#include <vector>

/// <summary>
/// Class representing information about a route, including ratings, comments, and usage statistics.
/// </summary>
class RouteInfoNode
{

public:
	/// <summary>
/// Basic constructor for RouteInfoNode class.
/// </summary>
	RouteInfoNode();

	/// <summary>
	/// Basic destructor for RouteInfoNode class.
	/// </summary>
	~RouteInfoNode();

	/// <summary>
		/// Adds a rating to the route information.
		/// </summary>
		/// <param name="rating">The rating to add.</param>
		/// <param name="day_night_flag">Flag indicating whether the rating is for day or night.</param>
	void addRating(int rating, int day_night_flag);

	/// <summary>
/// Adds a comment to the route information.
/// </summary>
/// <param name="comment">The comment to add.</param>
	void addComment(std::string comment);

	/// <summary>
/// Gets the safe rating for the route.
/// </summary>
/// <param name="day_night_flag">Flag indicating whether to get the day or night rating.</param>
/// <returns>The safe rating for the route.</returns>
	float get_safe_rating(int day_night_flag) const;

	/// <summary>
/// Gets the comments associated with the route.
/// </summary>
/// <returns>A vector of comments.</returns>
	int get_times_serched() const;

	/// <summary>
   /// Updates the usage statistics of the route.
   /// </summary>
   /// <param name="times_searched">Number of times the route was searched.</param>
   /// <param name="times_walked">Number of times the route was walked.</param>
	int get_times_walked() const;

	/// <summary>
/// Gets the number of times the route was searched.
/// </summary>
/// <returns>The number of times the route was searched.</returns>
	std::vector<std::string> get_comments() const;

	/// <summary>
/// Gets the number of times the route was walked.
/// </summary>
/// <returns>The number of times the route was walked.</returns>
	void update_node(int times_searched, int times_walked);

	/// <summary>
/// Increments the number of times the route was searched.
/// </summary>
	void incriment_searched();

	/// <summary>
/// Increments the number of times the route was walked.
/// </summary>
	void incriment_walked();

	/// <summary>
/// Clears the number of times the route was walked.
/// </summary>
	void clear_walked();

	/// <summary>
/// Clears the number of times the route was searched.
/// </summary>
	void clear_searched();

	/// <summary>
/// Clears all comments associated with the route.
/// </summary>
	void clear_comments();

private:
	// note, no name as these must be inside a map containing route names as key.
	float day_safe_rating; ///< Rating for the route during the day.
	float night_safe_rating; ///< Rating for the route during the night.
	int day_ratings_count; ///< Number of ratings received during the day.
	int night_ratings_count; ///< Number of ratings received during the night.
	std::vector<std::string> route_comments; ///< Comments associated with the route.
	int time_searched; ///< Number of times the route was searched.
	int time_walked; ///< Number of times the route was walked.

	/// <summary>
	/// Sets the night rating for the route.
	/// </summary>
	/// <param name="rating">The night rating to set.</param>
	void set_night_rating(int rating);

	/// <summary>
	/// Sets the day rating for the route.
	/// </summary>
	/// <param name="rating">The day rating to set.</param>
	void set_day_rating(int rating);
};


#endif // ROUTEINFONODE