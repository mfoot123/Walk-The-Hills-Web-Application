#ifndef COMMAND_PARSER
#define COMMAND_PARSER

#include <string>
#include <vector>
#include <sstream>
#include <algorithm> 
#include <cctype>
#include <locale>
#include <vector>

/// <summary>
/// Command_Parser class for parsing commands received by the server.
/// </summary>
class Command_Parser
{
public:
	/// <summary>
	/// Constructor for Command_Parser class.
	/// </summary>
	/// <param name="line">The command line to be parsed.</param>
	Command_Parser(std::string line);

	/// <summary>
	/// Detects if the given command line has an argument.
	/// </summary>
	/// <returns>True if the command has an argument, otherwise false.</returns>
	bool has_argument();

	/// <summary>
   /// Finds the index of the command in the list of valid commands.
   /// </summary>
   /// <returns>The index of the command in the list of valid commands, -1 if not found.</returns>
	int find_cmd_index();

	/// <summary>
	/// Gets the command from the command line.
	/// </summary>
	/// <returns>The command.</returns>
	std::string get_command();

	/// <summary>
/// Gets the route name from the command line.
/// </summary>
/// <returns>The route name.</returns>
	std::string get_route_name();

	/// <summary>
/// Gets the comment from the command line.
/// </summary>
/// <returns>The comment.</returns>
	std::string get_comment();

	/// <summary>
/// Gets the rating from the command line.
/// </summary>
/// <returns>The rating.</returns>
	int get_rating();

	/// <summary>
/// Gets the day/night flag from the command line.
/// </summary>
/// <returns>The day/night flag.</returns>
	int get_flag();

	/// <summary>
/// Trims leading and trailing whitespace from a string.
/// </summary>
/// <param name="s">The string to be trimmed.</param>
	inline void trim(std::string& s);

private:
	std::vector<std::string> valid_commands;
	std::string command;
	std::string route_name;
	std::string comment;
	int rating;
	int day_night_flag;

	void reject();
	inline void ltrim(std::string& s);

	inline void rtrim(std::string& s);

	std::string str_toupper(std::string s);

	std::string str_tolower(std::string s);

};





#endif // COMAND_PARSER