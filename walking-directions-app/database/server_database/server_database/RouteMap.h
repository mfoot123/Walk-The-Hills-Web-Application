#ifndef ROUTEMAP
#define ROUTEMAP

#include "RouteInfoNode.h"
#include <map>
#include <vector>
#include <iostream>
#include <ctime>    
#include <fstream>
#include <chrono>
#include <algorithm>

/// <summary>
/// Class representing a map of routes, including safety ratings, comments, and usage statistics.
/// </summary>
class RouteMap
{
public:
	/// <summary>
/// Default constructor for the RouteMap class.
/// </summary>
	RouteMap();

	/// <summary>
/// Destructor for the RouteMap class.
/// </summary>
	~RouteMap();

	/// <summary>
/// Gets all comments associated with routes in the map.
/// </summary>
/// <returns>A map of route names to vectors of comments.</returns>
	std::map< std::string, std::vector<std::string>> get_all_comments() const;

	/// <summary>
   /// Adds a record (comment and rating) to the specified route.
   /// </summary>
   /// <param name="route_name">The name of the route.</param>
   /// <param name="comment">The comment to add.</param>
   /// <param name="rating">The rating to add.</param>
   /// <param name="day_night_flag">Flag indicating whether it's day or night.</param>
	void add_record(std::string route_name, std::string comment, int rating, int day_night_flag);

	/// <summary>
	/// Adds a comment to the specified route without a rating.
	/// </summary>
	/// <param name="route_name">The name of the route.</param>
	/// <param name="comment">The comment to add.</param>
	void add_comment_only(std::string route_name, std::string comment);

	/// <summary>
	/// Generates a safety report for all routes in the map.
	/// </summary>
	/// <returns>A map of route names to vectors of safety ratings.</returns>
	std::map<std::string, std::vector<float>> safety_report();

	/// <summary>
	/// Gets the safety rating of the specified route.
	/// </summary>
	/// <param name="route_name">The name of the route.</param>
	/// <param name="day_night_flag">Flag indicating whether it's day or night.</param>
	/// <returns>The safety rating of the route.</returns>
	float get_route_safety(std::string route_name, int day_night_flag);

	/// <summary>
	/// Prints a new report containing route statistics to a CSV file.
	/// </summary>
	void print_new_report();

	/// <summary>
	/// Increments the number of times the specified route was searched.
	/// </summary>
	/// <param name="route_name">The name of the route.</param>
	void incriment_searched(std::string route_name);

	/// <summary>
   /// Increments the number of times the specified route was walked.
   /// </summary>
   /// <param name="route_name">The name of the route.</param>
	void incriment_walked(std::string route_name);

	/// <summary>
	/// Clears all comments associated with routes in the map.
	/// </summary>
	void clear_comments();

	/// <summary>
	/// Clears the number of times the specified route was searched.
	/// </summary>
	/// <param name="route_name">The name of the route.</param>
	void clear_searched(std::string route_name);

	/// <summary>
	/// Clears the number of times the specified route was walked.
	/// </summary>
	/// <param name="route_name">The name of the route.</param>
	void clear_walked(std::string route_name);

private:
	std::map<std::string, RouteInfoNode> mappedRouts;

	/// <summary>
	/// Adds a new route to the map.
	/// </summary>
	/// <param name="route_name">The name of the new route.</param>
	void add_new_route(std::string route_name);
};

#endif // ROUTEMAP