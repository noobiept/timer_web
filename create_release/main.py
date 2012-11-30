"""
    Python3

"""


import argparse
import os.path
import shutil
import re
import os
import distutils
import distutils.archive_util

import copy_files
import generate_config
import concatenate_files
import optimize




def go( htmlFile, copyFilesConfig, concatenateConfig ):
    """
        Arguments:
          copyFilesConfig (str) : path to the config file with the files to copy
    """

    resultingFolder = 'timer'

    cleanPreviousRun( resultingFolder )

    os.makedirs( resultingFolder )

    copy_files.copyFiles( copyFilesConfig, resultingFolder )

    generate_config.generate( htmlFile, concatenateConfig )
    
    concatenatedFileName = 'minimized.js'
    concatenatedFilePath = os.path.join( resultingFolder, concatenatedFileName )


    concatenate_files.concatenate( concatenateConfig, concatenatedFilePath )
    

    removeStrict( concatenatedFilePath )
    
    
        # run it through closure compiler to optimize (the javascript file)
    optimize.js( concatenatedFilePath )
    
       
    
    createNewIndex( htmlFile, concatenatedFileName, os.path.join( resultingFolder, "home.html" ) )
    
    
    
        # zip the folder
    compressFolder( resultingFolder )
    
    

    
def cleanPreviousRun( resultingFolder ):
    """
        Remove the files created from a previous run of this script (the whole folder, basically)

        Arguments:

            path (str) : path to the folder
    """

        # remove the folder
    if os.path.isdir( resultingFolder ):
        shutil.rmtree( resultingFolder )

    zip = resultingFolder + '.zip'
        
        # and the .zip file
    if os.path.isdir( zip ):
        shutil.rmtree( zip )




            
'''
    Creates a compressed folder with the todolist release
'''
    
def compressFolder( resultingFolder ):

    previousPath = os.getcwd()

    distutils.archive_util.make_archive(resultingFolder, 'zip', os.path.join(previousPath, resultingFolder))
    




def removeStrict( jsFile ):

    '''
    Removes the 'use strict'; (but the first one) -- closure complains about it
    '''
    
    with open( jsFile, 'r' ) as f:
        
        content = f.read()
    
        
        # replace 'use strict'; or "use strict"; for empty string
    newContent = re.sub( '[\'\"]use strict[\'\"];', '', content )
    
    
        # add just one in the beginning
    newContent = "'use strict';" + newContent
    
    
    with open( jsFile, 'w' ) as f:
        
        f.write( newContent )
    
        
        
        
'''
    Removes the part between the flags, and adds a single script with the concatenated file
    
    Arguments:
        
        indexPath        (string) : name of the index.html file
        concatenatedFile (string) : path to the concatenated file just created
        newIndexName     (string) : name of the new file that is created
'''

def createNewIndex( indexPath, concatenatedFile, newIndexName ):
    
        # get the file's content
    index = open( indexPath, 'r' )
    
    text = index.read()
    
    index.close()
    
    startFlag = "<!-- CONCATENATE_START -->"
    endFlag   = "<!-- CONCATENATE_END -->"
    
        # find the position where the flags are

    start = text.find( startFlag )
    end = text.find( endFlag, start )


        # get the part before the start flag
    textBefore = text[ : start ]
    
        # and after the end flag
    textAfter = text[ end + len(endFlag) : ]
    
    
        # create the new file
    newIndexName = os.path.normpath( newIndexName )

    newIndex = open( newIndexName, 'w' )
    
    newIndex.write( textBefore + '<script type="text/javascript" src="' + concatenatedFile + '"></script>' + textAfter )
    
    newIndex.close()
    
    print( "Created file:", newIndexName )
    
        

if __name__ == '__main__':

    parser = argparse.ArgumentParser( description='Create the release of the website plus the applications associated' )

    
    parser.add_argument( 'htmlFile', help='Path to the home.html.', nargs='?', default='../home.html' )

    parser.add_argument( 'copyFilesConfig', help='Path to the config file with the files to copy', nargs='?', default='copy_files_config.txt' )

    parser.add_argument( 'concatenateConfig', help='Path to the configuration file to tell which files to concatenate (and the order).', nargs='?', default='concatenate_config.txt' )

    args = parser.parse_args()

    go( args.htmlFile, args.copyFilesConfig, args.concatenateConfig )

